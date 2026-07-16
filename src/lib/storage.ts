import type { Place } from "./types";
import { SEED_PLACES } from "../data/seedPlaces";

const PLACES_KEY = "bizturizm.places.v1";
const SETTINGS_KEY = "bizturizm.settings.v1";
const ADMIN_KEY = "bizturizm.admin.v1";

export interface AppSettings {
  geminiApiKey: string;
  geminiModel: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  geminiApiKey: (import.meta.env.VITE_GEMINI_API_KEY as string) || "",
  geminiModel: (import.meta.env.VITE_GEMINI_MODEL as string) || "gemini-2.0-flash",
};

// ————— Joylar —————
export function loadPlaces(): Place[] {
  try {
    const raw = localStorage.getItem(PLACES_KEY);
    if (!raw) {
      localStorage.setItem(PLACES_KEY, JSON.stringify(SEED_PLACES));
      return [...SEED_PLACES];
    }
    return JSON.parse(raw) as Place[];
  } catch {
    return [...SEED_PLACES];
  }
}

export function savePlaces(places: Place[]): void {
  localStorage.setItem(PLACES_KEY, JSON.stringify(places));
}

export function resetPlaces(): Place[] {
  localStorage.setItem(PLACES_KEY, JSON.stringify(SEED_PLACES));
  return [...SEED_PLACES];
}

// ————— Sozlamalar —————
export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AppSettings>) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ————— Admin sessiya (oddiy demo autentifikatsiya) —————
const ADMIN_PASSWORD = "admin123"; // Demo uchun. Ishlab chiqarishda backend bilan almashtiriladi.

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(ADMIN_KEY);
}

export function isAdmin(): boolean {
  return localStorage.getItem(ADMIN_KEY) === "1";
}
