import Head from 'next/head';
import PawtecktView from '@/components/views/PawtecktView';

export default function PawtecktPage() {
  return (
    <>
      <Head>
        <title>Pawteckt — Pawzeeble</title>
      </Head>
      <PawtecktView />
    </>
  );
}
