import Head from 'next/head';
import BlogView from '@/components/views/BlogView';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>The Pawzeeble Journal</title>
      </Head>
      <BlogView />
    </>
  );
}
