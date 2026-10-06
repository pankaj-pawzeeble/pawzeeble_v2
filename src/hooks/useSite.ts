import { useContext } from 'react';
import { SiteContext } from '@/lib/site/SiteContext';

/** Access the live site values (state, handlers, refs) produced by SiteController. */
export function useSite() {
  return useContext(SiteContext);
}
