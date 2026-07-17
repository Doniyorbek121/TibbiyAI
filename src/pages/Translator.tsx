import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  ArrowLeftRight,
  Volume2,
  Copy,
  Check,
  X,
  Languages,
  Loader2,
  Info,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LANGUAGES, type LangCode } from "../i18n";
import { TRANSLATOR_STRINGS } from "../i18n/translator";
import { useI18n } from "../context/I18nContext";
import { useData } from "../context/DataContext";
import { translateFreeText } from "../lib/translate";
import {
  startRecognition,
  speak,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  type Recognizer,
} from "../lib/speech";
import { cn } from "../lib/utils";

function langDir(code: LangCode): "ltr" | "rtl" {
  return LANGUAGES.find((l) => l.code === code)?.dir ?? "ltr";
}

function LangSelect({
  value,
  onChange,
  label,
}: {
  value: LangCode;
  onChange: (l: LangCode) => void;
  label: string;
}) {
  return (
    <label className="flex-1">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LangCode)}
        className="input cursor-pointer font-medium"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.native}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Translator() {
  const { lang } = useI18n();
  const { settings } = useData();
  const s = TRANSLATOR_STRINGS[lang] ?? TRANSLATOR_STRINGS.en;

  const [source, setSource] = useState<LangCode>("uz");
  const [target, setTarget] = useState<LangCode>(() => (lang === "uz" ? "en" : lang));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recognizerRef = useRef<Recognizer | null>(null);

  const sttSupported = useMemo(() => isSpeechRecognitionSupported(), []);
  const ttsSupported = useMemo(() => isSpeechSynthesisSupported(), []);
  const hasKey = Boolean(settings.geminiApiKey);

  useEffect(() => () => recognizerRef.current?.stop(), []);

  async function runTranslate(text: string, speakAfter: boolean) {
    const q = text.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const res = await translateFreeText(
        q,
        source,
        target,
        settings.geminiApiKey,
        settings.geminiModel
      );
      setOutput(res);
      if (speakAfter && autoSpeak && res) speak(res, target);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "NO_API_KEY") setError(s.needKey);
      else if (msg === "INVALID_API_KEY") setError(s.needKey);
      else setError(s.needKey);
      setOutput("");
    } finally {
      setLoading(false);
    }
  }

  function handleMic() {
    if (listening) {
      recognizerRef.current?.stop();
      setListening(false);
      return;
    }
    setError(null);
    const rec = startRecognition(
      source,
      (text) => {
        setInput(text);
        runTranslate(text, true);
      },
      () => setListening(false),
      () => setListening(false)
    );
    if (rec) {
      recognizerRef.current = rec;
      setListening(true);
    }
  }

  function handleSwap() {
    setSource(target);
    setTarget(source);
    setInput(output);
    setOutput(input);
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard?.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="container-app py-8">
      <div className="mx-auto max-w-3xl">
        {/* Sarlavha */}
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-soft">
            <Languages size={24} />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{s.title}</h1>
            <p className="text-sm text-slate-500">{s.subtitle}</p>
          </div>
        </div>

        {/* Til tanlash */}
        <div className="mt-6 flex items-end gap-2 sm:gap-3">
          <LangSelect value={source} onChange={setSource} label={s.from} />
          <button
            type="button"
            onClick={handleSwap}
            aria-label={s.swap}
            title={s.swap}
            className="mb-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-brand-600 transition hover:border-brand-300 hover:bg-brand-50"
          >
            <ArrowLeftRight size={18} />
          </button>
          <LangSelect value={target} onChange={setTarget} label={s.to} />
        </div>

        {/* Kirish */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            dir={langDir(source)}
            rows={3}
            placeholder={s.inputPlaceholder}
            className="w-full resize-none bg-transparent px-1 py-1 text-lg outline-none placeholder:text-slate-400"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleMic}
                disabled={!sttSupported}
                aria-label={s.mic}
                title={sttSupported ? s.mic : s.micUnsupported}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full transition disabled:opacity-40",
                  listening
                    ? "animate-pulse bg-rose-500 text-white"
                    : "bg-brand-50 text-brand-600 hover:bg-brand-100"
                )}
              >
                {listening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label={s.clear}
                  title={s.clear}
                  className="grid h-10 w-10 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              )}
              {listening && (
                <span className="ml-1 text-sm font-medium text-rose-500">{s.listening}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => runTranslate(input, true)}
              disabled={loading || !input.trim()}
              className="btn-primary"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Languages size={16} />}
              {loading ? s.translating : s.translateBtn}
            </button>
          </div>
        </div>

        {/* Chiqish */}
        <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-brand-500">
              {s.resultTitle}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => output && speak(output, target)}
                disabled={!output || !ttsSupported}
                aria-label={s.speak}
                title={s.speak}
                className="grid h-9 w-9 place-items-center rounded-full text-brand-600 transition hover:bg-brand-100 disabled:opacity-30"
              >
                <Volume2 size={18} />
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                aria-label={s.copy}
                title={s.copy}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
              >
                {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <p
            dir={langDir(target)}
            className={cn(
              "mt-2 min-h-[3rem] whitespace-pre-wrap text-lg",
              output ? "text-slate-900" : "text-slate-300"
            )}
          >
            {output || "…"}
          </p>
        </div>

        {/* Sozlamalar qatori */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={(e) => setAutoSpeak(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            {s.autoSpeak}
          </label>
        </div>

        {/* Ogohlantirishlar */}
        {(error || (!hasKey && !error)) && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>
              {error ?? s.needKey}{" "}
              <Link
                to="/admin/sozlamalar"
                aria-label="Settings"
                className="inline-flex items-center gap-1 font-semibold underline"
              >
                <Settings size={14} />
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
