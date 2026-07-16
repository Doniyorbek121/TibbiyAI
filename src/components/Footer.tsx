import { Link } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";

export function Footer() {
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
          <p className="mt-3 text-sm text-slate-500">
            O'zbekiston bo'ylab AI yordamchisi bilan sayohat maskanlarini toping.
            Hozircha Namangan viloyati, Chust tumani to'liq qamrab olingan.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Bo'limlar</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-brand-700">Bosh sahifa</Link></li>
            <li><Link to="/kashf" className="hover:text-brand-700">Kashf etish</Link></li>
            <li><Link to="/yordamchi" className="hover:text-brand-700">AI Yordamchi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Hudud</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>Namangan viloyati</li>
            <li>Chust tumani</li>
            <li>Tez orada: butun O'zbekiston</li>
          </ul>
        </div>
        <div>
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
            <Sparkles size={14} className="text-brand-600" /> AI bilan ishlaydi
          </h4>
          <p className="mt-3 text-sm text-slate-500">
            Gemini AI yordamida savolingizga qarab eng mos joylarni tavsiya qiladi.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} BizTurizm. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
