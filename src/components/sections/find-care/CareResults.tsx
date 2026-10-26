import Router from 'next/router';
import { useAtomValue, useSetAtom } from 'jotai';
import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import { resolveClinicDetailTarget, type Clinic } from '@/lib/findcare';
import type { SiteItem } from '@/types/site';
import { bookingTypeAtom, locationAtom, locationLatLongAtom, setLocationOpenAtom } from '@/lib/location/atoms';
import styles from './CareResults.module.css';
import { useClinicResults } from './useClinicResults';

/** Only vet clinics are served by the API (entType=clinic); other services keep the static placeholder cards. */
const LIVE_SERVICE = 'Vet clinics';

const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');

const PLACEHOLDER = { vet: '/images/find-care/placeholders/vet-logo-placeholder.svg', groomer: '/images/find-care/placeholders/groomer-logo-placeholder.svg' };
/** Offer shown on Assured cards when the backend sends none. */
const DEFAULT_OFFER: Record<string, string> = { 'Vet clinics': '20% off consultation', Groomers: '25% off first groom', Boarders: '15% off boarding', Trainers: '₹300 off first session', Walking: 'First walk free' };
const places = (n: number) => (n === 1 ? '1 place' : `${n} places`);

/** Maps an API clinic to the card shape the grid renders. */
function clinicCard(c: Clinic): SiteItem {
  const target = resolveClinicDetailTarget(c);
  return {
    key: c._id,
    name: c.businessName || c.name,
    area: [c.area, c.city].filter(Boolean).join(', '),
    // TODO: the unit of `distance` is not documented; treated as metres (the search radius `distances=10000` is metres).
    distance: Number.isFinite(c.distance) ? (c.distance / 1000).toFixed(1) + ' km away' : '',
    price: c.onwardPrice ? rupees(c.onwardPrice) : '',
    assured: c.isAssurancePartner,
    hasOffer: c.isAssurancePartner,
    offer: DEFAULT_OFFER[LIVE_SERVICE],
    type: 'vet',
    href: target.kind === 'slug' ? `/find-care/clinic/${encodeURIComponent(target.slug)}` : `/find-care/clinic?id=${encodeURIComponent(target.id)}`,
    image: c.image,
    logo: c.logo,
    photoHint: c.businessName || c.name,
    // Business SEO URL when the page is live, otherwise the id.
    open: () => (target.kind === 'slug' ? Router.push(`/find-care/clinic/${encodeURIComponent(target.slug)}`) : Router.push({ pathname: '/find-care/clinic', query: { id: target.id } })),
  };
}

export default function CareResults() {
  const v = useSite();
  const live = v.service === LIVE_SERVICE;
  const { latitude, longitude } = useAtomValue(locationLatLongAtom);
  const bookingType = useAtomValue(bookingTypeAtom);
  const savedLocation = useAtomValue(locationAtom);
  const openLocation = useSetAtom(setLocationOpenAtom);
  const clinics = useClinicResults({ latitude, longitude, bookingType }, live);
  const cards: SiteItem[] = live ? clinics.records.map(clinicCard) : v.careResults;
  const count = live ? clinics.total : v.careResults.length;
  const needsLocation = live && !clinics.hasLocation;
  const empty = live ? !needsLocation && !clinics.loading && !clinics.error && clinics.records.length === 0 : v.careEmpty;
  const heading = live ? (savedLocation.description ? `Vet clinics near ${savedLocation.description}` : 'Vet clinics near you') : v.careHeading;
  return (
    <section id="pz-care-results" style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 70px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "clamp(24px,2.8vw,32px)", color: "#2B2342" }}>{heading}</h2>
        <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>
          {live ? (needsLocation ? "" : clinics.loading && cards.length === 0 ? "Loading…" : places(count)) : v.careCount}
        </span>
      </div>
      <div style={{ marginTop: "22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "18px" }}>
        {cards.map((r: SiteItem, index: number) => {
          const fallback = r.type === 'groomer' || r.kind === 'Groomers' ? PLACEHOLDER.groomer : PLACEHOLDER.vet;
          const go = () => (r.href ? void Router.push(r.href) : r.open?.());
          const closed = r.status === 'Closed';
          return (
            <a
              className={styles.card}
              href={r.href || undefined}
              role={r.href ? undefined : 'link'}
              tabIndex={r.href ? undefined : 0}
              aria-label={r.name}
              key={r.key ?? index}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                go();
              }}
              onKeyDown={(e) => {
                if (!r.href && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  go();
                }
              }}
            >
              <div style={{ position: "relative", height: "184px", background: "#F3EFFA" }}>
                <ImageSlot id={r.slotId} src={r.image} shape="rect" placeholder={r.photoHint} />
                <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", display: "flex", gap: "8px", flexWrap: "wrap", pointerEvents: "none" }}>
                  {r.assured ? (
                    <img src="/images/badges/pawzeeble-assured.svg" alt="Pawzeeble assured" width="163" height="28" style={{ display: "block", height: "28px", width: "auto" }} />
                  ) : (
                    <img src="/images/badges/instant-booking.webp" alt="Instant booking" width="141" height="28" style={{ display: "block", height: "28px", width: "auto", borderRadius: "5px" }} />
                  )}
                </div>
              </div>
              <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: "1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ minWidth: "0" }}>
                    <h3 style={{ fontSize: "19.5px", color: "#2B2342", lineHeight: "1.2", textWrap: "pretty" }}>{r.name}</h3>
                    <div style={{ marginTop: "6px", fontSize: "14px", color: "#5A5177" }}>{r.area}{r.distance ? " · " + r.distance : ""}</div>
                  </div>
                  <div style={{ flex: "none", width: "52px", height: "52px", borderRadius: "14px", border: "1.5px solid #EFEAF8", overflow: "hidden", background: "#fff" }}>
                    <img src={r.logo || fallback} alt="" width="52" height="52" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback; }} />
                  </div>
                </div>
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "14px" }}>
                  {r.status ? (
                    <>
                      <span style={{ fontWeight: "700", color: closed ? "#A3123F" : "#1E7A55" }}>{r.status}</span>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#A39CB8" }} />
                      <span style={{ color: "#6F6590" }}>{r.hours}</span>
                    </>
                  ) : null}
                  {r.price ? <span style={{ marginLeft: "auto", fontSize: "16px", fontWeight: "800", color: "#2B2342" }}>{r.price}{" onwards"}</span> : null}
                </div>
                {r.assured && r.hasOffer && r.offer ? (
                  <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "9px", background: "linear-gradient(90deg,#0E7C6B,#3DB3A3)", color: "#fff", padding: "10px 14px", borderRadius: "12px", fontSize: "14px", fontWeight: "700" }}>
                    <img src="/images/find-care/icons/offer.svg" alt="" width="17" height="17" style={{ flex: "none" }} />
                    <span style={{ flex: "1", minWidth: "0" }}>{r.offer}</span>
                    {r.hasMore ? <span style={{ flex: "none" }}>{r.moreLabel}</span> : null}
                  </div>
                ) : null}
              </div>
            </a>
          );
        })}
      </div>
      {needsLocation ? (
        <div style={{ marginTop: "22px", background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "28px", padding: "34px" }}>
          <h3 style={{ fontSize: "21px", color: "#2B2342" }}>Where should we look?</h3>
          <p style={{ marginTop: "9px", fontSize: "15.5px", lineHeight: "1.6", color: "#5A5177", maxWidth: "440px" }}>Enter your address to see clinics near you.</p>
          <button onClick={() => openLocation(true)} style={{ marginTop: "16px", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "12px 26px", borderRadius: "999px", backgroundColor: "#CA5C00" }}>Choose location</button>
        </div>
      ) : null}
      {live && clinics.error ? (
        <div style={{ marginTop: "22px", background: "#FFF1F1", border: "1.5px solid #F6CFCF", borderRadius: "28px", padding: "28px 34px" }}>
          <h3 style={{ fontSize: "19px", color: "#2B2342" }}>Couldn&apos;t load clinics</h3>
          <p style={{ marginTop: "8px", fontSize: "15px", color: "#5A5177" }}>{clinics.error}</p>
          <button onClick={clinics.retry} style={{ marginTop: "14px", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "11px 24px", borderRadius: "999px", backgroundColor: "#CA5C00" }}>Try again</button>
        </div>
      ) : null}
      {live && clinics.hasMore ? (
        <div style={{ marginTop: "26px", display: "flex", justifyContent: "center" }}>
          <button onClick={clinics.loadMore} disabled={clinics.loading} style={{ color: "#CA5C00", fontSize: "15px", fontWeight: "700", padding: "13px 32px", borderRadius: "999px", background: "#fff", border: "1.5px solid #CA5C00", opacity: clinics.loading ? 0.6 : 1 }}>
            {clinics.loading ? "Loading…" : "Load more"}
          </button>
        </div>
      ) : null}
      {empty ? (
        <div style={{ marginTop: "22px", background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "28px", padding: "34px" }}>
          <h3 style={{ fontSize: "21px", color: "#2B2342" }}>Nothing here yet</h3>
          <p style={{ marginTop: "9px", fontSize: "15.5px", lineHeight: "1.6", color: "#5A5177", maxWidth: "440px" }}>
            We haven&apos;t verified a provider for this combination yet. Tell us what you need and we&apos;ll prioritise it.
          </p>
        </div>
      ) : null}
    </section>
  );
}
