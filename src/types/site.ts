/* eslint-disable @typescript-eslint/no-explicit-any */
/** Values produced by SiteController.renderVals() and read by every view via useSite(). */
export type SiteVals = Record<string, any>;
/** A single entry of a list inside SiteVals (nav items, cards, FAQs…). */
export type SiteItem = any;

export interface RouteState {
  page: string;
  blogPost?: number;
  clinicType?: string;
}
