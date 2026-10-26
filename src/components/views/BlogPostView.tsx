import { useRouter } from 'next/router';
import BlogDetail from '@/components/sections/blog-post/BlogDetail';
import PostHeader from '@/components/sections/blog-post/PostHeader';
import PostCover from '@/components/sections/blog-post/PostCover';
import PostBody from '@/components/sections/blog-post/PostBody';
import RelatedReads from '@/components/sections/blog-post/RelatedReads';

/** /blog/post?id=<blog _id> (a 24-character id) shows the live article. Any other id keeps the old static design. */
export default function BlogPostView() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  if (!router.isReady) return <main />;
  if (id && /^[a-f0-9]{24}$/i.test(id)) return <BlogDetail id={id} />;
  return (
    <main>
      <PostHeader />
      <PostCover />
      <PostBody />
      <RelatedReads />
    </main>
  );
}
