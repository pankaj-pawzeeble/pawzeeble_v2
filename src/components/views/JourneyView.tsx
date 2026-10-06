import JourneyCloseButton from '@/components/sections/journey/JourneyCloseButton';
import JourneyProfileIntro from '@/components/sections/journey/JourneyProfileIntro';
import EcosystemScene from '@/components/sections/journey/EcosystemScene';
import JourneyProfileReaders from '@/components/sections/journey/JourneyProfileReaders';

export default function JourneyView() {
  return (
    <main>
      <JourneyCloseButton />
      <JourneyProfileIntro />
      <EcosystemScene />
      <JourneyProfileReaders />
    </main>
  );
}
