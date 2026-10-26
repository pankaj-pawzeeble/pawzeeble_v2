import PhotoGallery from '@/components/ui/PhotoGallery';
import { useClinicData } from './ClinicData';

/** Placeholder photos for the static design (no clinic loaded). */
export const SAMPLE_PHOTOS = [1, 2, 3, 4, 5].map((n) => `/images/clinic-groomer/gallery-sample-${n}.webp`);

export default function ClinicGallery() {
  const data = useClinicData();
  // TODO: `images[].path` is used as the image URL as-is; confirm whether it is absolute or needs a base / signed URL.
  const photos = data.live ? (data.clinic?.images ?? []).filter((i) => !i.deleted && i.path).map((i) => i.path) : SAMPLE_PHOTOS;
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "18px 22px 0" }}>
      {data.live && data.loading ? <div style={{ height: "410px", borderRadius: "28px", background: "#F2EEFA" }} /> : <PhotoGallery photos={photos} alt={data.clinic?.businessName || "Clinic"} />}
    </section>
  );
}
