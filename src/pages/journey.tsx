import Head from 'next/head';
import JourneyView from '@/components/views/JourneyView';

export default function JourneyPage() {
  return (
    <>
      <Head>
        <title>Universal Pet Profile — Pawzeeble</title>
      </Head>
      <JourneyView />
    </>
  );
}
