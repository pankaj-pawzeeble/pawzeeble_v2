import CryptoJS from 'crypto-js';
import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

/**
 * localStorage + AES (NEXT_PUBLIC_BITCOIN_RING), same passphrase scheme as the stored auth token.
 * Never throws: with no passphrase / no window / bad data it behaves like an empty store.
 */
export function createEncryptedStorage<T>(): SyncStorage<T> {
  const secret = () => process.env.NEXT_PUBLIC_BITCOIN_RING;
  return {
    getItem(key, initialValue) {
      try {
        const pass = secret();
        const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(key);
        if (!pass || !raw) return initialValue;
        const text = CryptoJS.AES.decrypt(raw, pass).toString(CryptoJS.enc.Utf8);
        return text ? (JSON.parse(text) as T) : initialValue;
      } catch {
        return initialValue;
      }
    },
    setItem(key, value) {
      try {
        const pass = secret();
        if (!pass || typeof window === 'undefined') return;
        window.localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(value), pass).toString());
      } catch {
        /* storage unavailable */
      }
    },
    removeItem(key) {
      try {
        if (typeof window !== 'undefined') window.localStorage.removeItem(key);
      } catch {
        /* storage unavailable */
      }
    },
  };
}

export const encryptedStorage = createEncryptedStorage<never>() as unknown as SyncStorage<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
