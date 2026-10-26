import type { ReactNode } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import MobileDrawer from '@/components/layout/MobileDrawer';
import ClosingBanner from '@/components/layout/ClosingBanner';
import SiteFooter from '@/components/layout/SiteFooter';
import ScrollTopButton from '@/components/layout/ScrollTopButton';
import AppQrCard from '@/components/layout/AppQrCard';
import BookingDialog from '@/components/overlays/BookingDialog';
import SubscribeFlow from '@/components/subscribe/SubscribeFlow';
import { DownloadGateProvider } from '@/components/sections/community/DownloadGate';
import { AppDownloadProvider } from '@/components/layout/AppDownload';
import { MyPurchasesProvider } from '@/components/layout/MyPurchases';
import IncompleteDraftsModal from '@/components/overlays/IncompleteDraftsModal';
import { useSite } from '@/hooks/useSite';

export default function SiteShell({ children }: { children: ReactNode }) {
  const v = useSite();
  return (
    <DownloadGateProvider>
    <AppDownloadProvider>
    <MyPurchasesProvider>
    <div style={{ minHeight: "100vh", background: "#FFFFFF", overflowX: "clip" }}>
      {v.chrome ? (
        <SiteHeader />
      ) : null}
      {v.menuOpen ? (
        <MobileDrawer />
      ) : null}
      {children}
      {v.chrome ? (
        <>
          <ClosingBanner />
          <SiteFooter />
        </>
      ) : null}
      {v.chrome ? (
        <ScrollTopButton />
      ) : null}
      {v.chrome ? (
        <AppQrCard />
      ) : null}
      {v.bkOpen ? (
        <BookingDialog />
      ) : null}
      {v.subOpen ? (
        <SubscribeFlow />
      ) : null}
      {v.draftsModalOpen ? (
        <IncompleteDraftsModal />
      ) : null}
    </div>
    </MyPurchasesProvider>
    </AppDownloadProvider>
    </DownloadGateProvider>
  );
}
