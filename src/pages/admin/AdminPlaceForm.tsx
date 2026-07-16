import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Save, ArrowLeft, ImageIcon } from "lucide-react";
import { useData } from "../../context/DataContext";
import { CATEGORIES } from "../../lib/categories";
import type { CategoryId, Place } from "../../lib/types";
import { slugId } from "../../lib/utils";
import { AdminShell } from "./AdminShell";

const EMPTY: Omit<Place, "id" | "createdAt"> = {
  name: "",
  category: "oshxona",
  region: "Namangan",
  district: "Chust",
  address: "",
  description: "",
  image: "",
  lat: 41.0028,
  lng: 71.2361,
  rating: 4.5,
  priceLevel: 1,
  phone: "",
  workingHours: "",
  tags: [],
  featured: false,
};

export default function AdminPlaceForm() {
  const { id } = useParams();
  const { getPlace, addPlace, updatePlace } = useData();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const p = getPlace(id);
      if (p) {
        const { id: _id, createdAt: _c, ...rest } = p;
        setForm(rest);
        setTagInput(p.tags.join(", "));
      }
    }
  }, [id, getPlace]);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim() || !form.description.trim()) {
      setError("Iltimos, nom, manzil va tavsif maydonlarini to'ldiring.");
      return;
    }
    const tags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const image =
      form.image.trim() ||
      `https://picsum.photos/seed/${slugId("img")}/800/600`;

    if (isEdit && id) {
      const existing = getPlace(id)!;
      updatePlace({ ...existing, ...form, image, tags });
    } else {
      addPlace({
        ...form,
        image,
        tags,
        id: slugId("place"),
        createdAt: Date.now(),
      });
    }
    navigate("/admin/joylar");
  };

  return (
    <AdminShell title={isEdit ? "Joyni tahrirlash" : "Yangi joy qo'shish"}>
      <Link
        to="/admin/joylar"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft size={16} /> Joylar ro'yxati
      </Link>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
        {/* Asosiy ma'lumot */}
        <div className="card space-y-4 p-5 lg:col-span-2">
          <div>
            <label className="label">Nomi *</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Masalan: Chust Milliy Oshxonasi"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Kategoriya *</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => set("category", e.target.value as CategoryId)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Narx darajasi</label>
              <select
                className="input"
                value={form.priceLevel}
                onChange={(e) =>
                  set("priceLevel", Number(e.target.value) as Place["priceLevel"])
                }
              >
                <option value={0}>Bepul</option>
                <option value={1}>Arzon</option>
                <option value={2}>O'rtacha</option>
                <option value={3}>Qimmat</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Viloyat</label>
              <input
                className="input"
                value={form.region}
                onChange={(e) => set("region", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Tuman</label>
              <input
                className="input"
                value={form.district}
                onChange={(e) => set("district", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label">Manzil *</label>
            <input
              className="input"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Ko'cha, uy raqami"
            />
          </div>

          <div>
            <label className="label">Tavsif *</label>
            <textarea
              className="input min-h-[110px] resize-y"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Joy haqida qisqacha ma'lumot..."
            />
          </div>

          <div>
            <label className="label">Teglar (vergul bilan ajrating)</label>
            <input
              className="input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="osh, somsa, choyxona"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600">{error}</p>
          )}
        </div>

        {/* Yon panel */}
        <div className="space-y-6">
          {/* Rasm */}
          <div className="card p-5">
            <label className="label">Rasm havolasi (URL)</label>
            <div className="overflow-hidden rounded-xl bg-slate-100">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Ko'rinish"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[4/3] place-items-center text-slate-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <input
              className="input mt-3"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://..."
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Bo'sh qoldirsangiz, avtomatik namuna rasm qo'yiladi.
            </p>
          </div>

          {/* Koordinatalar */}
          <div className="card p-5">
            <h3 className="mb-3 font-semibold text-slate-900">Joylashuv (koordinatalar)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Kenglik (lat)</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={form.lat}
                  onChange={(e) => set("lat", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="label">Uzunlik (lng)</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={form.lng}
                  onChange={(e) => set("lng", Number(e.target.value))}
                />
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/@${form.lat},${form.lng},15z`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-medium text-brand-700 hover:underline"
            >
              Xaritada tekshirish →
            </a>
          </div>

          {/* Qo'shimcha */}
          <div className="card space-y-4 p-5">
            <div>
              <label className="label">Telefon</label>
              <input
                className="input"
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+998 ..."
              />
            </div>
            <div>
              <label className="label">Ish vaqti</label>
              <input
                className="input"
                value={form.workingHours ?? ""}
                onChange={(e) => set("workingHours", e.target.value)}
                placeholder="09:00 – 22:00"
              />
            </div>
            <div>
              <label className="label">Reyting ({form.rating.toFixed(1)})</label>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                className="w-full accent-brand-600"
                value={form.rating}
                onChange={(e) => set("rating", Number(e.target.value))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4 accent-brand-600"
                checked={form.featured ?? false}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Bosh sahifada tavsiya etilsin ⭐
            </label>
          </div>

          <button type="submit" className="btn-primary w-full">
            <Save size={18} /> {isEdit ? "O'zgarishlarni saqlash" : "Joyni qo'shish"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
