import Head from 'next/head';
import FindCareView from '@/components/views/FindCareView';

export default function FindCarePage() {
  return (
    <>
      <Head>
        <title>Find Care — Pawzeeble</title>
      </Head>
      <FindCareView />
    </>
  );
}
