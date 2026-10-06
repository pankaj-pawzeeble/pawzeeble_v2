import Head from 'next/head';
import dynamic from 'next/dynamic';

// Rendered on the client only: the booking calendar is built from today's date.
const GroomerView = dynamic(() => import('@/components/views/GroomerView'), { ssr: false });

export default function FindCareGroomerPage() {
  return (
    <>
      <Head>
        <title>Groomer — Pawzeeble</title>
      </Head>
      <GroomerView />
    </>
  );
}
