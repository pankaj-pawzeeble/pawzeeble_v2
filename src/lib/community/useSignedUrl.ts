import { useEffect, useState } from 'react';
import { getSignedURL, needsSigning } from './api';

/** Resolves a media/avatar URL for display. Bucket URLs are signed first (undefined until ready); others pass through. */
export function useSignedUrl(url?: string | null): string | undefined {
  const [signed, setSigned] = useState<{ src: string; url: string } | null>(null);

  useEffect(() => {
    if (!url || !needsSigning(url)) return;
    let alive = true;
    getSignedURL(url).then((s) => {
      if (alive && s) setSigned({ src: url, url: s });
    });
    return () => {
      alive = false;
    };
  }, [url]);

  if (!url) return undefined;
  if (!needsSigning(url)) return url;
  return signed?.src === url ? signed.url : undefined;
}
