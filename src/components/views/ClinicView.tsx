import ClinicHeader from '@/components/sections/clinic/ClinicHeader';
import ClinicGallery from '@/components/sections/clinic/ClinicGallery';
import ClinicDetail from '@/components/sections/clinic/ClinicDetail';
import { ClinicDataProvider } from '@/components/sections/clinic/ClinicData';

export default function ClinicView() {
  return (
    <ClinicDataProvider>
      <main style={{ background: "#FFFFFF" }}>
        <ClinicHeader />
        <ClinicGallery />
        <ClinicDetail />
      </main>
    </ClinicDataProvider>
  );
}
