import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from '@mui/material/styles';
import SiteController from '@/lib/site/SiteController';
import SiteShell from '@/components/layout/SiteShell';
import { muiTheme } from '@/theme/muiTheme';
import { routeStateFrom } from '@/utils/routes';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const routeState = useMemo(() => routeStateFrom(router.pathname, router.query), [router.pathname, router.query]);
  const routeKey = `${router.asPath}|${router.isReady ? 1 : 0}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pawzeeble</title>
      </Head>
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />
      <JotaiProvider>
        <ThemeProvider theme={muiTheme}>
          <SiteController routeState={routeState} routeKey={routeKey}>
            <SiteShell>
              <Component {...pageProps} />
            </SiteShell>
          </SiteController>
        </ThemeProvider>
      </JotaiProvider>
    </>
  );
}
