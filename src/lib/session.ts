import { SupportedLanguage } from '../types';

export interface UserSession {
  signedIn: boolean;
  registered: boolean;
  name: string;
  state: string;
  language: SupportedLanguage;
  categories: string[];
  notifyInApp: boolean;
  notifyEmail: boolean;
  age?: number;
  occupation?: string;
  incomeRange?: string;
  landOwned?: boolean;
  ownsLand?: boolean;
  email?: string;
}

const STORAGE_KEY = 'scheme-saathi-user';

export function getUser(): UserSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch (e) {
    console.error('Failed to parse user session:', e);
    return null;
  }
}

export function saveUser(user: UserSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user session:', e);
  }
}

export function signOut(): void {
  try {
    const current = getUser();
    if (current) {
      // Retain registration data so returning user can sign in without re-registering,
      // but mark signedIn as false
      saveUser({
        ...current,
        signedIn: false,
      });
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to sign out:', e);
  }
}

export function clearUserAccount(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear user account:', e);
  }
}
