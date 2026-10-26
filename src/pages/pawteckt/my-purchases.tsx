import Head from 'next/head';
import MyPurchasesView from '@/components/views/MyPurchasesView';

export default function MyPurchasesPage() {
  return (
    <>
      <Head>
        <title>My Pawteckt — Pawzeeble</title>
        <meta name="robots" content="noindex" />
      </Head>
      <MyPurchasesView />
    </>
  );
}
