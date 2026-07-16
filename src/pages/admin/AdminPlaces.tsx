import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, RotateCcw } from "lucide-react";
import { useData } from "../../context/DataContext";
import { CATEGORIES, categoryEmoji, categoryName } from "../../lib/categories";
import { priceLabel } from "../../lib/utils";
import type { CategoryId } from "../../lib/types";
import { AdminShell } from "./AdminShell";

export default function AdminPlaces() {
  const { places, deletePlace, resetAll } = useData();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...places].sort((a, b) => b.createdAt - a.createdAt);
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }
    return list;
  }, [places, cat, query]);

  return (
    <AdminShell
      title="Joylar"
      actions={
        <Link to="/admin/joylar/yangi" className="btn-primary">
          <Plus size={16} /> <span className="hidden sm:inline">Yangi joy</span>
        </Link>
      }
    >
      {/* Filtrlash */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Joy nomini qidiring..."
            className="flex-1 bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as CategoryId | "all")}
          className="input sm:w-56"
        >
          <option value="all">Barcha kategoriyalar</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (confirm("Barcha joylarni boshlang'ich (namuna) holatiga qaytarishni tasdiqlaysizmi? Sizning o'zgarishlaringiz o'chadi.")) {
              resetAll();
            }
          }}
          className="btn-outline"
          title="Namuna ma'lumotlarni tiklash"
        >
          <RotateCcw size={16} /> <span className="hidden sm:inline">Tiklash</span>
        </button>
      </div>

      {/* Jadval (desktop) */}
      <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Joy</th>
              <th className="px-4 py-3 font-medium">Kategoriya</th>
              <th className="px-4 py-3 font-medium">Manzil</th>
              <th className="px-4 py-3 font-medium">Reyting</th>
              <th className="px-4 py-3 font-medium">Narx</th>
              <th className="px-4 py-3 text-right font-medium">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{p.name}</p>
                      {p.featured && (
                        <span className="text-xs text-amber-600">⭐ Tavsiya</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {categoryEmoji(p.category)} {categoryName(p.category)}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {p.district}, {p.region}
                </td>
                <td className="px-4 py-3 text-slate-600">⭐ {p.rating.toFixed(1)}</td>
                <td className="px-4 py-3 text-slate-600">{priceLabel(p.priceLevel)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/admin/joylar/${p.id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => setConfirmId(p.id)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-slate-500">Joy topilmadi</p>
        )}
      </div>

      {/* Kartochkalar (mobil) */}
      <div className="mt-5 space-y-3 md:hidden">
        {filtered.map((p) => (
          <div key={p.id} className="card flex gap-3 p-3">
            <img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900 line-clamp-1">{p.name}</p>
              <p className="text-xs text-slate-500">
                {categoryEmoji(p.category)} {categoryName(p.category)} · ⭐ {p.rating.toFixed(1)}
              </p>
              <p className="text-xs text-slate-400 line-clamp-1">{p.address}</p>
              <div className="mt-2 flex gap-2">
                <Link to={`/admin/joylar/${p.id}`} className="btn-outline px-3 py-1.5 text-xs">
                  <Pencil size={13} /> Tahrir
                </Link>
                <button
                  onClick={() => setConfirmId(p.id)}
                  className="btn px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 size={13} /> O'chirish
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-slate-500">Joy topilmadi</p>
        )}
      </div>

      {/* O'chirishni tasdiqlash */}
      {confirmId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
          <div className="card w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-900">Joyni o'chirish</h3>
            <p className="mt-2 text-sm text-slate-500">
              "{places.find((p) => p.id === confirmId)?.name}" joyini o'chirmoqchimisiz?
              Bu amalni ortga qaytarib bo'lmaydi.
            </p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setConfirmId(null)} className="btn-outline flex-1">
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  deletePlace(confirmId);
                  setConfirmId(null);
                }}
                className="btn flex-1 bg-rose-600 text-white hover:bg-rose-700"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
