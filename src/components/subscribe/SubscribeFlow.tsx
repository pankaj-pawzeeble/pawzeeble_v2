import PhoneStep from '@/components/subscribe/steps/PhoneStep';
import OtpStep from '@/components/subscribe/steps/OtpStep';
import PaymentStep from '@/components/subscribe/steps/PaymentStep';
import PetStep from '@/components/subscribe/steps/PetStep';
import JoinStep from '@/components/subscribe/steps/JoinStep';
import AddPetStep from '@/components/subscribe/steps/AddPetStep';
import DoneStep from '@/components/subscribe/steps/DoneStep';
import EligibilityStep from '@/components/subscribe/steps/EligibilityStep';
import KycStep from '@/components/subscribe/steps/KycStep';
import PayLaterStep from '@/components/subscribe/steps/PayLaterStep';
import PayExpiredStep from '@/components/subscribe/steps/PayExpiredStep';
import PolicyDoneStep from '@/components/subscribe/steps/PolicyDoneStep';
import AppHandoffStep from '@/components/subscribe/steps/AppHandoffStep';
import { useSite } from '@/hooks/useSite';

export default function SubscribeFlow() {
  const v = useSite();
  return (
    <div data-r="sub-wrap" role="dialog" aria-modal="true" aria-label="Subscribe to Pawteckt lite" style={{ position: "fixed", inset: "0", zIndex: "200", background: "rgba(43,35,66,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div data-r="sub-panel" style={{ position: "relative", width: "100%", maxWidth: "440px", maxHeight: "92vh", background: "#fff", borderRadius: "28px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px rgba(43,35,66,.35)" }}>
        {v.subIsPhone ? <PhoneStep /> : null}
        {v.subIsOtp ? <OtpStep /> : null}
        {v.subIsPay ? <PaymentStep /> : null}
        {v.subIsPet ? <PetStep /> : null}
        {v.subIsJoin ? <JoinStep /> : null}
        {v.subIsAdd ? <AddPetStep /> : null}
        {v.subIsDone ? <DoneStep /> : null}
        {v.subIsElig ? <EligibilityStep /> : null}
        {v.subIsKyc ? <KycStep /> : null}
        {v.subIsPlater ? <PayLaterStep /> : null}
        {v.subIsPexp ? <PayExpiredStep /> : null}
        {v.subIsPdone ? <PolicyDoneStep /> : null}
        {v.subIsApp ? <AppHandoffStep /> : null}
      </div>
    </div>
  );
}
