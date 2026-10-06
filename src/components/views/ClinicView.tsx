import ClinicHeader from '@/components/sections/clinic/ClinicHeader';
import ClinicGallery from '@/components/sections/clinic/ClinicGallery';
import ClinicDetail from '@/components/sections/clinic/ClinicDetail';

export default function ClinicView() {
  return (
    <main style={{ background: "#FFFCF6" }}>
      <ClinicHeader />
      <ClinicGallery />
      <ClinicDetail />
    </main>
  );
}
