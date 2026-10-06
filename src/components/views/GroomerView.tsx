import GroomerHeader from '@/components/sections/groomer/GroomerHeader';
import GroomerGallery from '@/components/sections/groomer/GroomerGallery';
import GroomerDetail from '@/components/sections/groomer/GroomerDetail';

export default function GroomerView() {
  return (
    <main style={{ background: "#FFFCF6" }}>
      <GroomerHeader />
      <GroomerGallery />
      <GroomerDetail />
    </main>
  );
}
