import { atom } from 'jotai';
import type { BusinessVlog, Vlog } from './types';

/** The vlog open in the player on /blog (set from the home section, then routed to /blog). */
export const selectedVlogAtom = atom<Vlog | null>(null);

/** The business vlog open in the clinic page player. */
export const selectedBusinessVlogAtom = atom<BusinessVlog | null>(null);
