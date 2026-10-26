import AboutStory from '@/components/sections/about/AboutStory';
import AboutOurStory from '@/components/sections/about/AboutOurStory';
import AboutCofounder from '@/components/sections/about/AboutCofounder';
import AboutTimeline from '@/components/sections/about/AboutTimeline';
import AboutMission from '@/components/sections/about/AboutMission';
import AboutStats from '@/components/sections/about/AboutStats';
import AboutCatalysts from '@/components/sections/about/AboutCatalysts';
import AboutRecognition from '@/components/sections/about/AboutRecognition';
import AboutTeam from '@/components/sections/about/AboutTeam';

export default function AboutView() {
  return (
    <main>
      <AboutStory />
      <AboutOurStory />
      <AboutCofounder />
      <AboutTimeline />
      <AboutMission />
      <AboutStats />
      <AboutCatalysts />
      <AboutRecognition />
      <AboutTeam />
    </main>
  );
}
