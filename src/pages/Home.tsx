import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Search, MapPin, ArrowRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { CATEGORIES } from "../lib/categories";
import { PlaceCard } from "../components/PlaceCard";

const QUICK_PROMPTS = [
  "Menga oshxona kerak",
  "Ziyoratgoh joylar",
  "Arzon mehmonxona",
  "Chust pichog'i qayerdan olsam bo'ladi?",
];

export default function Home() {
  const { places } = useData();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const featured = places.filter((p) => p.featured).slice(0, 6);
  const goAssistant = (query: string) =>
    navigate(`/yordamchi?q=${encodeURIComponent(query)}`);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container-app relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip mx-auto border-white/30 bg-white/10 text-white">
              <Sparkles size={14} /> Gemini AI bilan ishlaydi
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              O'zbekistonni AI yordamchisi bilan kashf eting
            </h1>
            <p className="mt-4 text-lg text-brand-50">
              Oshxona, mehmonxona, ziyoratgoh yoki sayohat maskani kerakmi?
              Shunchaki so'rang — rasmi, manzili va lokatsiyasi bilan tavsiya qilamiz.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) goAssistant(q.trim());
              }}
              className="mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-soft"
            >
              <Search className="ml-2 text-slate-400" size={20} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Masalan: menga milliy taomlar oshxonasi kerak..."
                className="flex-1 bg-transparent px-1 py-2 text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="btn-primary">
                So'rash
              </button>
            </form>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => goAssistant(p)}
                  className="chip border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORIYALAR */}
      <section className="container-app py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Kategoriyalar</h2>
            <p className="mt-1 text-slate-500">Nima izlayotganingizni tanlang</p>
          </div>
          <Link to="/kashf" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline">
            Hammasi →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/kashf?cat=${c.id}`}
              className="card group flex flex-col gap-2 p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="font-semibold text-slate-900">{c.name}</span>
              <span className="text-xs text-slate-500 line-clamp-2">{c.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TAVSIYA ETILGAN */}
      <section className="container-app pb-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tavsiya etilgan maskanlar</h2>
            <p className="mt-1 flex items-center gap-1 text-slate-500">
              <MapPin size={14} /> Chust tumani, Namangan
            </p>
          </div>
          <Link to="/kashf" className="text-sm font-semibold text-brand-700 hover:underline">
            Barchasi →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className="container-app py-14">
        <div className="card flex flex-col items-center gap-4 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white sm:p-12">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500">
            <Sparkles size={26} />
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">Aniq nima kerakligini bilmaysizmi?</h2>
          <p className="max-w-xl text-slate-300">
            AI yordamchimizga oddiy tilda savol bering — "kechqurun oilam bilan
            dam olsak bo'ladigan joy" desangiz ham, sizga eng mos variantlarni topib beradi.
          </p>
          <Link to="/yordamchi" className="btn-primary">
            AI yordamchini ochish <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
