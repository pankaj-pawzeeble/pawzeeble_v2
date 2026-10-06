import AboutStory from '@/components/sections/about/AboutStory';
import AboutStats from '@/components/sections/about/AboutStats';
import AboutTimeline from '@/components/sections/about/AboutTimeline';
import AboutBackers from '@/components/sections/about/AboutBackers';
import AboutMission from '@/components/sections/about/AboutMission';
import AboutTeam from '@/components/sections/about/AboutTeam';
import AboutOpenRoles from '@/components/sections/about/AboutOpenRoles';

export default function AboutView() {
  return (
    <main>
      <AboutStory />
      <AboutStats />
      <AboutTimeline />
      <AboutBackers />
      <AboutMission />
      <AboutTeam />
      <AboutOpenRoles />
    </main>
  );
}
