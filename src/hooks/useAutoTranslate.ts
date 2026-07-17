import { useEffect, useState } from "react";
import { useI18n } from "../context/I18nContext";
import { useData } from "../context/DataContext";
import { translateTexts, getCached } from "../lib/translate";
import type { Place } from "../lib/types";

/**
 * Bitta o'zbekcha matnni joriy tilga avtomatik tarjima qiladi.
 * Kesh bo'lsa darhol, bo'lmasa asl matn ko'rsatiladi va fon rejimida tarjima keladi.
 */
export function useTranslated(text: string): string {
  const { lang } = useI18n();
  const { settings } = useData();
  const [value, setValue] = useState<string>(
    () => (lang === "uz" ? text : getCached(lang, text) ?? text)
  );

  useEffect(() => {
    let alive = true;
    if (lang === "uz" || !text) {
      setValue(text);
      return;
    }
    const cached = getCached(lang, text);
    setValue(cached ?? text);
    if (cached !== undefined || !settings.geminiApiKey) return;

    translateTexts([text], lang, settings.geminiApiKey, settings.geminiModel).then(
      (res) => {
        if (alive) setValue(res[0] ?? text);
      }
    );
    return () => {
      alive = false;
    };
  }, [text, lang, settings.geminiApiKey, settings.geminiModel]);

  return value;
}

export interface TranslatedPlaceFields {
  name: string;
  description: string;
  address: string;
  region: string;
  district: string;
  /** Tarjima jarayoni ketayotgan bo'lsa true (skeleton uchun) */
  translating: boolean;
}

/**
 * Joyning matnli maydonlarini (nom, tavsif, manzil, viloyat, tuman) joriy
 * tilga avtomatik tarjima qiladi. Barchasi bitta so'rovda keshlanadi.
 */
export function useTranslatedPlace(place: Place): TranslatedPlaceFields {
  const { lang } = useI18n();
  const { settings } = useData();

  const original: Omit<TranslatedPlaceFields, "translating"> = {
    name: place.name,
    description: place.description,
    address: place.address,
    region: place.region,
    district: place.district,
  };

  const [fields, setFields] = useState<Omit<TranslatedPlaceFields, "translating">>(
    () => resolveInitial(lang, place)
  );
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    let alive = true;
    if (lang === "uz") {
      setFields(original);
      setTranslating(false);
      return;
    }

    const initial = resolveInitial(lang, place);
    setFields(initial);

    const sources = [
      place.name,
      place.description,
      place.address,
      place.region,
      place.district,
    ];
    const allCached = sources.every(
      (s) => !s || getCached(lang, s) !== undefined
    );
    if (allCached || !settings.geminiApiKey) return;

    setTranslating(true);
    translateTexts(sources, lang, settings.geminiApiKey, settings.geminiModel)
      .then(([name, description, address, region, district]) => {
        if (!alive) return;
        setFields({ name, description, address, region, district });
      })
      .finally(() => {
        if (alive) setTranslating(false);
      });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id, lang, settings.geminiApiKey, settings.geminiModel]);

  return { ...fields, translating };
}

function resolveInitial(
  lang: string,
  place: Place
): Omit<TranslatedPlaceFields, "translating"> {
  if (lang === "uz") {
    return {
      name: place.name,
      description: place.description,
      address: place.address,
      region: place.region,
      district: place.district,
    };
  }
  const L = lang as Parameters<typeof getCached>[0];
  return {
    name: getCached(L, place.name) ?? place.name,
    description: getCached(L, place.description) ?? place.description,
    address: getCached(L, place.address) ?? place.address,
    region: getCached(L, place.region) ?? place.region,
    district: getCached(L, place.district) ?? place.district,
  };
}
