import Head from 'next/head';
import AboutView from '@/components/views/AboutView';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Pawzeeble</title>
      </Head>
      <AboutView />
    </>
  );
}
