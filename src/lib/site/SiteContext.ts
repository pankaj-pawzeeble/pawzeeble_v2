import { createContext } from 'react';
import type { SiteVals } from '@/types/site';

export const SiteContext = createContext<SiteVals>({});
