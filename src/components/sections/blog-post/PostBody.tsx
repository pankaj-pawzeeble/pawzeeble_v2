import { Fragment } from 'react';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function PostBody() {
  const v = useSite();
  return (
    <article style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 22px 64px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {v.post.body.map((b: SiteItem, index: number) => (
        <Fragment key={index}>
          {b.isH ? (
            <h2 style={{ marginTop: "14px", fontSize: "26px", lineHeight: "1.25", color: "#2B2342", letterSpacing: "-.015em" }}>{b.text}</h2>
          ) : null}
          {b.isP ? (
            <p style={{ fontSize: "17.5px", lineHeight: "1.75", color: "#3D3558", textWrap: "pretty" }}>{b.text}</p>
          ) : null}
          {b.isQ ? (
            <blockquote style={{ margin: "8px 0", padding: "22px 26px", background: "#FFF4E9", borderRadius: "20px", fontSize: "19px", lineHeight: "1.55", fontWeight: "700", color: "#7A3700", textWrap: "pretty" }}>{b.text}</blockquote>
          ) : null}
        </Fragment>
      ))}
    </article>
  );
}
