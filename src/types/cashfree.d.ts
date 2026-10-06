declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeInstance {
    checkout(options: { paymentSessionId: string; returnUrl?: string; redirectTarget?: string }): Promise<unknown>;
  }
  export function load(options: { mode: 'sandbox' | 'production' }): Promise<CashfreeInstance | null>;
}
