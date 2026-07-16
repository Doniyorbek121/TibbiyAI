import { Link } from "react-router-dom";
import { MapPinned, Star, Sparkles, Plus, KeyRound, TrendingUp } from "lucide-react";
import { useData } from "../../context/DataContext";
import { CATEGORIES } from "../../lib/categories";
import { AdminShell } from "./AdminShell";

export default function AdminDashboard() {
  const { places, settings } = useData();

  const total = places.length;
  const featured = places.filter((p) => p.featured).length;
  const avgRating =
    total > 0 ? (places.reduce((s, p) => s + p.rating, 0) / total).toFixed(1) : "0";

  const byCategory = CATEGORIES.map((c) => ({
    ...c,
    count: places.filter((p) => p.category === c.id).length,
  }));

  const stats = [
    { label: "Jami joylar", value: total, icon: MapPinned, color: "bg-brand-50 text-brand-700" },
    { label: "Tavsiya etilgan", value: featured, icon: Star, color: "bg-amber-50 text-amber-700" },
    { label: "O'rtacha reyting", value: avgRating, icon: TrendingUp, color: "bg-sky-50 text-sky-700" },
    {
      label: "AI holati",
      value: settings.geminiApiKey ? "Faol" : "O'chiq",
      icon: Sparkles,
      color: settings.geminiApiKey ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <AdminShell
      title="Boshqaruv paneli"
      actions={
        <Link to="/admin/joylar/yangi" className="btn-primary">
          <Plus size={16} /> Yangi joy
        </Link>
      }
    >
      {/* Statistikalar */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${s.color}`}>
              <s.icon size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Kategoriyalar bo'yicha */}
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold text-slate-900">Kategoriyalar bo'yicha taqsimot</h2>
          <div className="mt-4 space-y-3">
            {byCategory.map((c) => {
              const pct = total > 0 ? Math.round((c.count / total) * 100) : 0;
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {c.emoji} {c.name}
                    </span>
                    <span className="text-slate-500">{c.count} ta</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tezkor amallar */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-slate-900">Tezkor amallar</h2>
            <div className="mt-3 space-y-2">
              <Link to="/admin/joylar/yangi" className="btn-outline w-full justify-start">
                <Plus size={16} /> Yangi joy qo'shish
              </Link>
              <Link to="/admin/joylar" className="btn-outline w-full justify-start">
                <MapPinned size={16} /> Joylarni boshqarish
              </Link>
              <Link to="/admin/sozlamalar" className="btn-outline w-full justify-start">
                <KeyRound size={16} /> Gemini API sozlash
              </Link>
            </div>
          </div>

          {!settings.geminiApiKey && (
            <div className="card border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2 font-semibold text-amber-800">
                <Sparkles size={16} /> AI ni yoqing
              </div>
              <p className="mt-1.5 text-sm text-amber-700">
                Gemini API kalitini kiritib, foydalanuvchilarga aqlli tavsiyalar bering.
              </p>
              <Link to="/admin/sozlamalar" className="btn-primary mt-3 w-full">
                Sozlash
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
