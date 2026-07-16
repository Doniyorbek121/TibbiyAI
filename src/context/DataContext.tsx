import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Place } from "../lib/types";
import {
  loadPlaces,
  savePlaces,
  resetPlaces,
  loadSettings,
  saveSettings,
  type AppSettings,
  isAdmin as checkAdmin,
  loadFavorites,
  saveFavorites,
} from "../lib/storage";

interface DataContextValue {
  places: Place[];
  addPlace: (place: Place) => void;
  updatePlace: (place: Place) => void;
  deletePlace: (id: string) => void;
  resetAll: () => void;
  getPlace: (id: string) => Place | undefined;

  settings: AppSettings;
  updateSettings: (s: AppSettings) => void;

  favorites: string[];
  favoritePlaces: Place[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;

  admin: boolean;
  setAdmin: (v: boolean) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(() => loadPlaces());
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [admin, setAdmin] = useState<boolean>(() => checkAdmin());
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites());

  useEffect(() => {
    savePlaces(places);
  }, [places]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const value = useMemo<DataContextValue>(
    () => ({
      places,
      addPlace: (place) => setPlaces((prev) => [place, ...prev]),
      updatePlace: (place) =>
        setPlaces((prev) => prev.map((p) => (p.id === place.id ? place : p))),
      deletePlace: (id) => setPlaces((prev) => prev.filter((p) => p.id !== id)),
      resetAll: () => setPlaces(resetPlaces()),
      getPlace: (id) => places.find((p) => p.id === id),

      settings,
      updateSettings: (s) => {
        setSettings(s);
        saveSettings(s);
      },

      favorites,
      favoritePlaces: favorites
        .map((id) => places.find((p) => p.id === id))
        .filter((p): p is Place => Boolean(p)),
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) =>
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
        ),

      admin,
      setAdmin,
    }),
    [places, settings, admin, favorites]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
