import PostHeader from '@/components/sections/blog-post/PostHeader';
import PostCover from '@/components/sections/blog-post/PostCover';
import PostBody from '@/components/sections/blog-post/PostBody';
import RelatedReads from '@/components/sections/blog-post/RelatedReads';

export default function BlogPostView() {
  return (
    <main>
      <PostHeader />
      <PostCover />
      <PostBody />
      <RelatedReads />
    </main>
  );
}
