import EcosystemHero from '@/components/sections/ecosystem/EcosystemHero';
import EcosystemProducts from '@/components/sections/ecosystem/EcosystemProducts';
import EcosystemProfileCta from '@/components/sections/ecosystem/EcosystemProfileCta';

export default function EcosystemView() {
  return (
    <main>
      <EcosystemHero />
      <EcosystemProducts />
      <EcosystemProfileCta />
    </main>
  );
}
