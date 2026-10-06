import BlogHero from '@/components/sections/blog/BlogHero';
import BlogArticles from '@/components/sections/blog/BlogArticles';
import BlogPodcasts from '@/components/sections/blog/BlogPodcasts';
import BlogNewsletter from '@/components/sections/blog/BlogNewsletter';
import { useSite } from '@/hooks/useSite';

export default function BlogView() {
  const v = useSite();
  return (
    <main>
      <BlogHero />
      {v.showArticles ? <BlogArticles /> : null}
      {v.showPodcasts ? <BlogPodcasts /> : null}
      <BlogNewsletter />
    </main>
  );
}
