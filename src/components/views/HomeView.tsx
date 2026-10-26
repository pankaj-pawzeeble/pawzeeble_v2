import HomeHero from '@/components/sections/home/HomeHero';
import ServicesMarquee from '@/components/sections/home/ServicesMarquee';
import FeatureRail from '@/components/sections/home/FeatureRail';
import PawtecktStaticPanel from '@/components/sections/home/PawtecktStaticPanel';
import HomeFamilySection from '@/components/sections/home/HomeFamilySection';
import CitiesSection from '@/components/sections/home/CitiesSection';
import SheruAiSection from '@/components/sections/home/SheruAiSection';
import ClansSection from '@/components/sections/home/ClansSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import BlogsVlogsSection from '@/components/sections/home/BlogsVlogsSection';
import HomeFaqSection from '@/components/sections/home/HomeFaqSection';

export default function HomeView() {
  return (
    <main>
      <HomeHero />
      <ServicesMarquee />
      <FeatureRail />
      <PawtecktStaticPanel />
      <HomeFamilySection />
      <SheruAiSection />
      <ClansSection />
      <CitiesSection />
      <TestimonialsSection />
      <BlogsVlogsSection />
      <HomeFaqSection />
    </main>
  );
}
