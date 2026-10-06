import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';

export default function PostCover() {
  const v = useSite();
  return (
    <div style={{ maxWidth: "1040px", margin: "30px auto 0", padding: "0 22px" }}>
      <div style={{ height: "clamp(240px,42vw,480px)", borderRadius: "28px", overflow: "hidden" }}>
        <ImageSlot id={v.post.slotId} shape="rect" placeholder={v.post.photoHint} />
      </div>
    </div>
  );
}
