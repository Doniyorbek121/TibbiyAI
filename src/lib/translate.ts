import { LANGUAGES, type LangCode } from "../i18n";

// —————————————————————————————————————————————————————————
// Dinamik kontent tarjimasi (admin qo'shgan joylar, tavsiflar va h.k.)
// Gemini AI orqali tarjima qilinadi va natija localStorage'da keshlanadi.
// Kalit bo'lmasa yoki xatolik bo'lsa — asl (o'zbekcha) matn qaytariladi.
// —————————————————————————————————————————————————————————

const CACHE_PREFIX = "bizturizm.tr.v1.";

function langEnglishName(code: LangCode): string {
  return LANGUAGES.find((l) => l.code === code)?.english ?? code;
}

// ————— Kesh —————
type Cache = Record<string, string>;

function loadCache(lang: LangCode): Cache {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + lang);
    return raw ? (JSON.parse(raw) as Cache) : {};
  } catch {
    return {};
  }
}

function saveCache(lang: LangCode, cache: Cache): void {
  try {
    localStorage.setItem(CACHE_PREFIX + lang, JSON.stringify(cache));
  } catch {
    /* kvota to'lgan bo'lishi mumkin — e'tiborsiz qoldiramiz */
  }
}

export function getCached(lang: LangCode, text: string): string | undefined {
  if (!text) return text;
  return loadCache(lang)[text];
}

// So'rovlarni takrorlamaslik uchun jarayondagi (in-flight) promiselar
const inFlight = new Map<string, Promise<string[]>>();

/**
 * Bir nechta matnni bitta Gemini so'rovi bilan tarjima qiladi.
 * Natija tartibi kirish tartibiga mos keladi.
 */
export async function translateTexts(
  texts: string[],
  target: LangCode,
  apiKey: string,
  model: string
): Promise<string[]> {
  if (target === "uz" || !apiKey) return texts;

  const cache = loadCache(target);
  const result: string[] = new Array(texts.length);
  const missing: { idx: number; text: string }[] = [];

  texts.forEach((text, idx) => {
    if (!text || !text.trim()) {
      result[idx] = text;
    } else if (cache[text] !== undefined) {
      result[idx] = cache[text];
    } else {
      missing.push({ idx, text });
    }
  });

  if (missing.length === 0) return result;

  const uniqueTexts = Array.from(new Set(missing.map((m) => m.text)));
  const cacheKey = `${target}::${uniqueTexts.join("")}`;

  let promise = inFlight.get(cacheKey);
  if (!promise) {
    promise = requestGeminiTranslation(uniqueTexts, target, apiKey, model);
    inFlight.set(cacheKey, promise);
    promise.finally(() => inFlight.delete(cacheKey));
  }

  try {
    const translated = await promise;
    const map: Record<string, string> = {};
    uniqueTexts.forEach((t, i) => (map[t] = translated[i] ?? t));

    const fresh = loadCache(target);
    uniqueTexts.forEach((t) => (fresh[t] = map[t]));
    saveCache(target, fresh);

    missing.forEach((m) => (result[m.idx] = map[m.text] ?? m.text));
    return result;
  } catch {
    // Xatolik — asl matnni qaytaramiz
    missing.forEach((m) => (result[m.idx] = m.text));
    return result;
  }
}

async function requestGeminiTranslation(
  texts: string[],
  target: LangCode,
  apiKey: string,
  model: string
): Promise<string[]> {
  const targetName = langEnglishName(target);
  const prompt = `You are a professional translator for a tourism platform about Uzbekistan.
Translate each string in the JSON array below from Uzbek into ${targetName}.
Rules:
- Keep proper nouns (place names, people, brands like "Chust", "Namangan", "BizTurizm") readable and natural in the target language.
- Keep the meaning natural and fluent, not word-for-word.
- Return ONLY a JSON array of translated strings, same length and order. No explanations.

INPUT:
${JSON.stringify(texts)}

OUTPUT (JSON array only):`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
    }),
  });

  if (!res.ok) throw new Error(`TRANSLATE_ERROR_${res.status}`);

  const data = await res.json();
  const raw: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  const arr = JSON.parse(
    start >= 0 && end >= 0 ? cleaned.slice(start, end + 1) : cleaned
  );
  if (!Array.isArray(arr)) throw new Error("BAD_TRANSLATE_SHAPE");
  return arr.map((x) => (typeof x === "string" ? x : String(x)));
}

/**
 * Ixtiyoriy ikki til orasidagi erkin matn tarjimasi (ovozli tarjimon uchun).
 */
export async function translateFreeText(
  text: string,
  source: LangCode,
  target: LangCode,
  apiKey: string,
  model: string
): Promise<string> {
  if (!text.trim()) return "";
  if (source === target) return text;

  // Avval oflayn iboralar lug'atini tekshiramiz (kalitsiz ham ishlashi uchun)
  const offline = lookupPhrasebook(text, source, target);
  if (offline) return offline;

  if (!apiKey) throw new Error("NO_API_KEY");

  const sourceName = langEnglishName(source);
  const targetName = langEnglishName(target);
  const prompt = `Translate the following text from ${sourceName} to ${targetName}.
Return ONLY the translation, with no quotes and no explanations.

TEXT: ${text}

TRANSLATION:`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2 },
    }),
  });
  if (!res.ok) {
    if (res.status === 400 || res.status === 403) throw new Error("INVALID_API_KEY");
    throw new Error(`TRANSLATE_ERROR_${res.status}`);
  }
  const data = await res.json();
  const out: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return out.trim().replace(/^["']|["']$/g, "");
}

// —————————————————————————————————————————————————————————
// Oflayn iboralar lug'ati — API kalitisiz ham keng tarqalgan
// so'zlarni tarjima qilish (asosan o'zbek tilidan).
// —————————————————————————————————————————————————————————

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[!?.,'’`]+$/g, "").replace(/\s+/g, " ");
}

const PHRASEBOOK: Record<string, Partial<Record<LangCode, string>>> = {
  salom: {
    uz: "Salom", ru: "Привет", en: "Hello", zh: "你好", ar: "مرحبا", tr: "Merhaba",
    kk: "Сәлем", tg: "Салом", ja: "こんにちは", de: "Hallo", fr: "Bonjour", es: "Hola",
    ko: "안녕하세요", fa: "سلام", hi: "नमस्ते", it: "Ciao", pt: "Olá", ky: "Салам",
    tk: "Salam", az: "Salam", uk: "Привіт",
  },
  rahmat: {
    uz: "Rahmat", ru: "Спасибо", en: "Thank you", zh: "谢谢", ar: "شكرا", tr: "Teşekkürler",
    kk: "Рахмет", tg: "Раҳмат", ja: "ありがとう", de: "Danke", fr: "Merci", es: "Gracias",
    ko: "감사합니다", fa: "متشکرم", hi: "धन्यवाद", it: "Grazie", pt: "Obrigado", ky: "Рахмат",
    tk: "Sag boluň", az: "Təşəkkür", uk: "Дякую",
  },
  xayr: {
    uz: "Xayr", ru: "До свидания", en: "Goodbye", zh: "再见", ar: "وداعا", tr: "Hoşça kal",
    kk: "Сау болыңыз", tg: "Хайр", ja: "さようなら", de: "Auf Wiedersehen", fr: "Au revoir",
    es: "Adiós", ko: "안녕히 가세요", fa: "خداحافظ", hi: "अलविदा", it: "Arrivederci",
    pt: "Adeus", ky: "Кош бол", tk: "Hoş gal", az: "Sağ ol", uk: "До побачення",
  },
  ha: {
    uz: "Ha", ru: "Да", en: "Yes", zh: "是的", ar: "نعم", tr: "Evet", kk: "Иә", tg: "Ҳа",
    ja: "はい", de: "Ja", fr: "Oui", es: "Sí", ko: "네", fa: "بله", hi: "हाँ", it: "Sì",
    pt: "Sim", ky: "Ооба", tk: "Hawa", az: "Bəli", uk: "Так",
  },
  "yo'q": {
    uz: "Yo'q", ru: "Нет", en: "No", zh: "不", ar: "لا", tr: "Hayır", kk: "Жоқ", tg: "Не",
    ja: "いいえ", de: "Nein", fr: "Non", es: "No", ko: "아니요", fa: "نه", hi: "नहीं",
    it: "No", pt: "Não", ky: "Жок", tk: "Ýok", az: "Xeyr", uk: "Ні",
  },
  iltimos: {
    uz: "Iltimos", ru: "Пожалуйста", en: "Please", zh: "请", ar: "من فضلك", tr: "Lütfen",
    kk: "Өтінемін", tg: "Лутфан", ja: "お願いします", de: "Bitte", fr: "S'il vous plaît",
    es: "Por favor", ko: "부탁합니다", fa: "لطفا", hi: "कृपया", it: "Per favore",
    pt: "Por favor", ky: "Сураныч", tk: "Haýyş", az: "Zəhmət olmasa", uk: "Будь ласка",
  },
  kechirasiz: {
    uz: "Kechirasiz", ru: "Извините", en: "Excuse me", zh: "对不起", ar: "المعذرة",
    tr: "Affedersiniz", kk: "Кешіріңіз", tg: "Бубахшед", ja: "すみません", de: "Entschuldigung",
    fr: "Excusez-moi", es: "Disculpe", ko: "실례합니다", fa: "ببخشید", hi: "क्षमा करें",
    it: "Mi scusi", pt: "Com licença", ky: "Кечиресиз", tk: "Bagyşlaň", az: "Bağışlayın",
    uk: "Вибачте",
  },
  "xush kelibsiz": {
    uz: "Xush kelibsiz", ru: "Добро пожаловать", en: "Welcome", zh: "欢迎", ar: "أهلا وسهلا",
    tr: "Hoş geldiniz", kk: "Қош келдіңіз", tg: "Хуш омадед", ja: "ようこそ", de: "Willkommen",
    fr: "Bienvenue", es: "Bienvenido", ko: "환영합니다", fa: "خوش آمدید", hi: "स्वागत है",
    it: "Benvenuto", pt: "Bem-vindo", ky: "Кош келиңиз", tk: "Hoş geldiňiz",
    az: "Xoş gəldiniz", uk: "Ласкаво просимо",
  },
};

export function lookupPhrasebook(
  text: string,
  source: LangCode,
  target: LangCode
): string | undefined {
  const norm = normalize(text);
  for (const entry of Object.values(PHRASEBOOK)) {
    // Har qanday tildagi variant mos kelsa, target tildagini qaytaramiz
    const values = Object.entries(entry);
    const hit = values.find(([code, val]) => {
      void code;
      return normalize(val ?? "") === norm;
    });
    if (hit) {
      // source ma'lum bo'lsa, aynan source varianti mosligini afzal ko'ramiz
      const sourceVal = entry[source];
      if (sourceVal && normalize(sourceVal) !== norm) continue;
      return entry[target];
    }
  }
  return undefined;
}
