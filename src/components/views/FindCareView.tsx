import CareHero from '@/components/sections/find-care/CareHero';
import CareSearchBar from '@/components/sections/find-care/CareSearchBar';
import CareTrustStrip from '@/components/sections/find-care/CareTrustStrip';
import CareCategories from '@/components/sections/find-care/CareCategories';
import CareHowItWorks from '@/components/sections/find-care/CareHowItWorks';
import CareResults from '@/components/sections/find-care/CareResults';

export default function FindCareView() {
  return (
    <main>
      <CareHero />
      <CareSearchBar />
      <CareTrustStrip />
      <CareCategories />
      <CareHowItWorks />
      <CareResults />
    </main>
  );
}
