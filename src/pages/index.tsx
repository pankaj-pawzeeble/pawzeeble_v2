import Head from 'next/head';
import HomeView from '@/components/views/HomeView';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pawzeeble — Everything your pet needs, in one app</title>
      </Head>
      <HomeView />
    </>
  );
}
