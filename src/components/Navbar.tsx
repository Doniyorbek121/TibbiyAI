import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkles, Compass, Home, ShieldCheck, Heart, Languages } from "lucide-react";
import { cn } from "../lib/utils";
import { useData } from "../context/DataContext";
import { useI18n } from "../context/I18nContext";
import { TRANSLATOR_STRINGS } from "../i18n/translator";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { favorites } = useData();
  const { t, lang } = useI18n();
  const favCount = favorites.length;

  const nav = [
    { to: "/", label: t("navHome"), icon: Home, end: true },
    { to: "/kashf", label: t("navExplore"), icon: Compass },
    { to: "/yordamchi", label: t("navAssistant"), icon: Sparkles },
    { to: "/tarjimon", label: TRANSLATOR_STRINGS[lang]?.nav ?? TRANSLATOR_STRINGS.en.nav, icon: Languages },
    { to: "/sevimli", label: t("navFavorites"), icon: Heart },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-2">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
            <Compass size={18} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Biz<span className="text-brand-600">Turizm</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100"
                )
              }
            >
              <item.icon size={16} />
              {item.label}
              {item.to === "/sevimli" && favCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
                  {favCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link to="/admin" className="btn-outline hidden md:inline-flex">
            <ShieldCheck size={16} /> {t("navAdmin")}
          </Link>
          <button
            className="btn-ghost lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-app flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-xl px-3.5 py-3 text-sm font-medium",
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-700"
                  )
                }
              >
                <item.icon size={18} />
                {item.label}
                {item.to === "/sevimli" && favCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
                    {favCount}
                  </span>
                )}
              </NavLink>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-700"
            >
              <ShieldCheck size={18} /> {t("navAdmin")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
