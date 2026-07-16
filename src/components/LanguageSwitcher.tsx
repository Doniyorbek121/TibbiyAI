import { useEffect, useRef, useState } from "react";
import { Globe, Check, Search } from "lucide-react";
import { LANGUAGES } from "../i18n";
import { useI18n } from "../context/I18nContext";
import { cn } from "../lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = LANGUAGES.filter((l) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      l.native.toLowerCase().includes(q) ||
      l.english.toLowerCase().includes(q) ||
      l.code.includes(q)
    );
  });

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("langLabel")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700",
          compact && "px-2.5"
        )}
      >
        <Globe size={16} className="text-brand-600" />
        <span className="text-base leading-none">{current.flag}</span>
        {!compact && <span className="hidden sm:inline">{current.native}</span>}
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 px-3">
            <Search size={15} className="text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("langLabel")}
              className="w-full bg-transparent py-2.5 text-sm outline-none"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2 text-start text-sm transition hover:bg-slate-50",
                    l.code === lang && "bg-brand-50"
                  )}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="flex-1">
                    <span className="block font-medium text-slate-800">{l.native}</span>
                    <span className="block text-xs text-slate-400">{l.english}</span>
                  </span>
                  {l.code === lang && <Check size={16} className="text-brand-600" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-slate-400">—</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
