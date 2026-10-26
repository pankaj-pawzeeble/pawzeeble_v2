import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react';
import Autocomplete, { type AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { findUnsafeString, placesService, type PlacePrediction, type ResolvedLocation } from '@/lib/findcare';
import { locationAtom, locationLatLongAtom, locationOpenAtom, setLocationAreaAtom, setLocationLatLongAtom, setLocationOpenAtom } from '@/lib/location/atoms';

interface Option {
  label: string;
  value: string;
}

const MIN_CHARS = 3;
const DEBOUNCE_MS = 200;
const MAX_CHARS = 100;

/** Address search dialog: type → suggestions → select → coordinates + area → saved location. */
export default function LocationPopup() {
  const open = useAtomValue(locationOpenAtom);
  const setOpen = useSetAtom(setLocationOpenAtom);
  const saved = useAtomValue(locationAtom);
  const { latitude: savedLat, longitude: savedLng } = useAtomValue(locationLatLongAtom);
  const setArea = useSetAtom(setLocationAreaAtom);
  const setLatLong = useSetAtom(setLocationLatLongAtom);

  const [q, setQ] = useState('');
  const [placeId, setPlaceId] = useState('');
  /** Suggestions for the query `forQ`. Loading = a valid query whose suggestions have not arrived yet. */
  const [results, setResults] = useState<{ forQ: string; items: PlacePrediction[] }>({ forQ: '', items: [] });
  const [locating, setLocating] = useState(false);

  /** One Google session token per search-and-select cycle; reset after selection. */
  const sessionRef = useRef('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const searchRun = useRef(0);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  /** Saves the location, resets the session, sets the cookie, stores lat/lng and closes the dialog. */
  const updateLocation = useCallback(
    ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      setPlaceId('');
      sessionRef.current = '';
      // TODO: the contract says to set the 'location' cookie but not its value; storing "lat,lng".
      document.cookie = `location=${encodeURIComponent(`${latitude},${longitude}`)}; path=/`;
      setLatLong(latitude, longitude);
      setOpen(false);
    },
    [setLatLong, setOpen],
  );

  const apply = useCallback(
    (resolved: ResolvedLocation) => {
      setArea(resolved.area, resolved.place_id);
      updateLocation(resolved.position.coords);
    },
    [setArea, updateLocation],
  );

  /* On mount: refresh the area for the saved coordinates. */
  useEffect(() => {
    if (!savedLat || !savedLng) return;
    let cancelled = false;
    placesService.resolveCoordinates(savedLat, savedLng).then((r) => {
      if (!cancelled && r.area) setArea(r.area, r.place_id);
    });
    return () => {
      cancelled = true;
    };
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* q → suggestions. An unsafe query clears the suggestions and is never sent. */
  const queryOk = Boolean(q) && !findUnsafeString(q);
  const loading = queryOk && results.forQ !== q;
  const predictions = queryOk && results.forQ === q ? results.items : [];

  useEffect(() => {
    const run = ++searchRun.current;
    if (!queryOk || !sessionRef.current) return;
    placesService.searchPlaces(q, sessionRef.current).then((res) => {
      if (run === searchRun.current) setResults({ forQ: q, items: res ?? [] });
    });
  }, [q, queryOk]);

  /* placeId → coordinates → area → save. */
  useEffect(() => {
    if (!placeId) return;
    let cancelled = false;
    placesService.resolvePlace(placeId, sessionRef.current).then((resolved) => {
      if (cancelled) return;
      if (!resolved.position.coords.latitude && !resolved.position.coords.longitude) {
        setPlaceId('');
        return;
      }
      apply(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, [placeId, apply]);

  const onInputChange = (_e: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason === 'reset') return; // selecting an option fills the input; that must not start a new search
    clearTimeout(debounceRef.current);
    if (reason === 'clear' || !value) {
      setQ('');
      return;
    }
    if (value.length < MIN_CHARS) return;
    debounceRef.current = setTimeout(() => {
      if (!sessionRef.current) sessionRef.current = nanoid();
      setQ(value);
    }, DEBOUNCE_MS);
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      setOpen(false);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const resolved = await placesService.resolveCoordinates(coords.latitude, coords.longitude);
        setLocating(false);
        apply(resolved);
      },
      () => {
        setLocating(false);
        setOpen(false);
      },
      { enableHighAccuracy: true },
    );
  };

  const options: Option[] = predictions.map((p) => ({ label: p.description, value: p.place_id }));
  if (saved.place_id && saved.description && !options.some((o) => o.value === saved.place_id)) {
    options.push({ label: saved.description, value: saved.place_id });
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800, color: '#2B2342' }}>Choose your location</DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        <Autocomplete<Option>
          options={options}
          loading={loading}
          value={null}
          filterOptions={(x) => x}
          getOptionLabel={(o) => o.label}
          isOptionEqualToValue={(a, b) => a.value === b.value}
          onInputChange={onInputChange}
          onChange={(_e, option) => {
            if (option) setPlaceId(option.value);
          }}
          noOptionsText={q.length >= MIN_CHARS ? 'No addresses found' : 'Type at least 3 characters'}
          loadingText="Searching…"
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              placeholder={saved.description || 'Input location'}
              inputProps={{ ...params.inputProps, maxLength: MAX_CHARS }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={18} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Button onClick={locateMe} disabled={locating} sx={{ mt: 2, textTransform: 'none', fontWeight: 700, color: '#CA5C00' }}>
          {locating ? 'Locating…' : 'Locate me'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
