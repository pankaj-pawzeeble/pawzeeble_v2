import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PURCHASE_PATH } from '@/lib/pawteckt/lite';

/**
 * UPI AutoPay mandate return. Redirect-only (no UI): sends the user back into the
 * existing subscribe flow with the draft saved before the mandate redirect.
 */
export default function MandateReturn() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    let draftId: string | null = null;
    try {
      draftId = window.sessionStorage.getItem('litePendingDraftId');
      window.sessionStorage.removeItem('litePendingDraftId');
    } catch {
      /* storage unavailable */
    }
    if (!draftId) {
      void router.replace('/');
      return;
    }
    const params = new URLSearchParams();
    Object.entries(router.query).forEach(([k, v]) => {
      if (typeof v === 'string') params.set(k, v);
    });
    params.set('action', 'step1');
    params.set('draft', draftId);
    params.set('planType', 'LITE');
    void router.replace(`${PURCHASE_PATH}?${params.toString()}`);
  }, [router]);
  return null;
}
