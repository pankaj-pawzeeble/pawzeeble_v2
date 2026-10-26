import PhotoGallery from '@/components/ui/PhotoGallery';
import { SAMPLE_PHOTOS } from '@/components/sections/clinic/ClinicGallery';

/** The groomer page is still the static design, so it shows the placeholder photos. */
export default function GroomerGallery() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "18px 22px 0" }}>
      <PhotoGallery photos={SAMPLE_PHOTOS} alt="Salon" />
    </section>
  );
}
