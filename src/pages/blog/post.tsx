import Head from 'next/head';
import BlogPostView from '@/components/views/BlogPostView';

export default function BlogPostPage() {
  return (
    <>
      <Head>
        <title>The Pawzeeble Journal</title>
      </Head>
      <BlogPostView />
    </>
  );
}
