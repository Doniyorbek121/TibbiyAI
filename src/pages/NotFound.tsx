import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container-app py-24 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{t("nfTitle")}</h1>
      <p className="mt-2 text-slate-500">{t("nfText")}</p>
      <Link to="/" className="btn-primary mt-6">
        {t("nfBtn")}
      </Link>
    </div>
  );
}
