import GroomerHeader from '@/components/sections/groomer/GroomerHeader';
import GroomerGallery from '@/components/sections/groomer/GroomerGallery';
import GroomerDetail from '@/components/sections/groomer/GroomerDetail';

export default function GroomerView() {
  return (
    <main style={{ background: "#FFFFFF" }}>
      <GroomerHeader />
      <GroomerGallery />
      <GroomerDetail />
    </main>
  );
}
