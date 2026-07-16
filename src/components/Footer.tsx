import { Link } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { TRANSLATOR_STRINGS } from "../i18n/translator";

export function Footer() {
  const { t, lang } = useI18n();
  const translatorNav = TRANSLATOR_STRINGS[lang]?.nav ?? TRANSLATOR_STRINGS.en.nav;

  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <Compass size={16} />
            </span>
            <span className="text-base font-extrabold">
              Biz<span className="text-brand-600">Turizm</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">{t("footerTagline")}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{t("footerSections")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-brand-700">{t("navHome")}</Link></li>
            <li><Link to="/kashf" className="hover:text-brand-700">{t("navExplore")}</Link></li>
            <li><Link to="/yordamchi" className="hover:text-brand-700">{t("navAssistant")}</Link></li>
            <li><Link to="/tarjimon" className="hover:text-brand-700">{translatorNav}</Link></li>
            <li><Link to="/sevimli" className="hover:text-brand-700">{t("navFavorites")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{t("footerRegion")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>{t("footerRegionItem1")}</li>
            <li>{t("footerRegionItem2")}</li>
            <li>{t("footerRegionItem3")}</li>
          </ul>
        </div>
        <div>
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
            <Sparkles size={14} className="text-brand-600" /> {t("footerAiTitle")}
          </h4>
          <p className="mt-3 text-sm text-slate-500">{t("footerAiText")}</p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} BizTurizm. {t("footerRights")}
      </div>
    </footer>
  );
}
