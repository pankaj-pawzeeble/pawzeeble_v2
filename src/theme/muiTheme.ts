import { createTheme } from '@mui/material/styles';

/** MUI theme mirroring the site palette, for any MUI components added later. */
export const muiTheme = createTheme({
  palette: {
    primary: { main: '#6351A1' },
    secondary: { main: '#CA5C00' },
    text: { primary: '#2B2342', secondary: '#5A5177' },
    background: { default: '#FFFCF6' },
  },
  typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
  shape: { borderRadius: 12 },
});
