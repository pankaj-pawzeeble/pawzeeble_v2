import Head from 'next/head';
import dynamic from 'next/dynamic';

// Rendered on the client only: the booking calendar is built from today's date.
const ClinicView = dynamic(() => import('@/components/views/ClinicView'), { ssr: false });

export default function FindCareClinicPage() {
  return (
    <>
      <Head>
        <title>Clinic — Pawzeeble</title>
      </Head>
      <ClinicView />
    </>
  );
}
