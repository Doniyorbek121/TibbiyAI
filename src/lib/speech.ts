import type { LangCode } from "../i18n";

// LangCode -> BCP-47 nutq lokal kodlari (STT va TTS uchun)
export const SPEECH_LOCALE: Record<LangCode, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
  zh: "zh-CN",
  ar: "ar-SA",
  tr: "tr-TR",
  kk: "kk-KZ",
  tg: "tg-TJ",
  ja: "ja-JP",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  ko: "ko-KR",
  fa: "fa-IR",
  hi: "hi-IN",
  it: "it-IT",
  pt: "pt-PT",
  ky: "ky-KG",
  tk: "tk-TM",
  az: "az-AZ",
  uk: "uk-UA",
};

type SpeechRecognitionCtor = new () => {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export interface Recognizer {
  stop: () => void;
}

/** Ovozli kiritishni boshlaydi. Yakuniy matnni onResult orqali qaytaradi. */
export function startRecognition(
  lang: LangCode,
  onResult: (text: string) => void,
  onEnd: () => void,
  onError?: (err: unknown) => void
): Recognizer | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;

  const rec = new Ctor();
  rec.lang = SPEECH_LOCALE[lang] ?? "en-US";
  rec.continuous = false;
  rec.interimResults = false;

  rec.onresult = (e) => {
    const transcript = e.results?.[0]?.[0]?.transcript ?? "";
    if (transcript) onResult(transcript);
  };
  rec.onerror = (err) => onError?.(err);
  rec.onend = () => onEnd();

  try {
    rec.start();
  } catch (err) {
    onError?.(err);
    return null;
  }
  return { stop: () => rec.stop() };
}

/** Matnni tanlangan tilda ovoz chiqarib o'qiydi. */
export function speak(text: string, lang: LangCode): void {
  if (!isSpeechSynthesisSupported() || !text.trim()) return;
  const synth = window.speechSynthesis;
  synth.cancel();

  const locale = SPEECH_LOCALE[lang] ?? "en-US";
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = locale;

  const voices = synth.getVoices();
  const exact = voices.find((v) => v.lang?.toLowerCase() === locale.toLowerCase());
  const partial = voices.find((v) =>
    v.lang?.toLowerCase().startsWith(lang.toLowerCase())
  );
  const voice = exact ?? partial;
  if (voice) utter.voice = voice;

  synth.speak(utter);
}
