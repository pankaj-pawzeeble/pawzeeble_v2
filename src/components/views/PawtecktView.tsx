import PawtecktHero from '@/components/sections/pawteckt/PawtecktHero';
import PawtecktTrustStrip from '@/components/sections/pawteckt/PawtecktTrustStrip';
import PawtecktBenefits from '@/components/sections/pawteckt/PawtecktBenefits';
import PawtecktPlans from '@/components/sections/pawteckt/PawtecktPlans';
import PawtecktComparison from '@/components/sections/pawteckt/PawtecktComparison';
import PawtecktCoverage from '@/components/sections/pawteckt/PawtecktCoverage';
import PawtecktEligibility from '@/components/sections/pawteckt/PawtecktEligibility';
import PawtecktClaims from '@/components/sections/pawteckt/PawtecktClaims';
import PawtecktFaq from '@/components/sections/pawteckt/PawtecktFaq';
import PawtecktClosingCta from '@/components/sections/pawteckt/PawtecktClosingCta';

export default function PawtecktView() {
  return (
    <main data-r="pt-main">
      <PawtecktHero />
      <PawtecktTrustStrip />
      <PawtecktBenefits />
      <PawtecktPlans />
      <PawtecktComparison />
      <PawtecktCoverage />
      <PawtecktEligibility />
      <PawtecktClaims />
      <PawtecktFaq />
      <PawtecktClosingCta />
    </main>
  );
}
