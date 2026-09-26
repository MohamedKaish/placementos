/**
 * candidate-store.ts
 * Lightweight localStorage-backed profile store for PlacementOS.
 * Always use the helper functions — never read localStorage directly in components.
 */

export interface CandidateProfile {
  studentName: string;
  department: string;       // e.g. 'EEE'
  academicYear: string;     // e.g. 'Year 4'
  roleId: string;           // e.g. 'power-systems-engineer'
  claimedScore: number;
  createdAt: string;        // ISO timestamp
}

const PROFILE_KEY = 'placementos_candidate_profile';
const SESSION_KEY = 'placementos_session';

/** Returns the stored profile, or null if none. */
export function getStoredProfile(): CandidateProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CandidateProfile;
  } catch {
    return null;
  }
}

/** Persists a candidate profile. */
export function saveProfile(profile: CandidateProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

/** Clears profile + session state (logout / switch user). */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(SESSION_KEY);
}
