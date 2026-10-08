import Head from 'next/head';
import CommunityView from '@/components/views/CommunityView';

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>Community — Pawzeeble</title>
      </Head>
      <CommunityView />
    </>
  );
}
