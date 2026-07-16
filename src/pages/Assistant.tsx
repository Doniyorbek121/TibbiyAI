import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Sparkles, Send, Bot, User, Info, KeyRound } from "lucide-react";
import { useData } from "../context/DataContext";
import { askGemini, localSearch } from "../lib/gemini";
import type { ChatMessage, Place } from "../lib/types";
import { PlaceCard } from "../components/PlaceCard";
import { slugId } from "../lib/utils";

const SUGGESTIONS = [
  "Menga milliy taomlar oshxonasi kerak",
  "Arzon mehmonxona qidiryapman",
  "Ziyoratgoh joylarni ko'rsat",
  "Chust pichog'ini qayerdan sotib olsam bo'ladi?",
  "Oilam bilan dam oladigan joy",
  "Tabiat qo'ynidagi sayilgoh",
];

export default function Assistant() {
  const { places, settings } = useData();
  const [params] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const usingAI = Boolean(settings.geminiApiKey);

  useEffect(() => {
    const q = params.get("q");
    if (q) {
      handleSend(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: slugId("msg"),
      role: "user",
      text: query,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    let reply = "";
    let matched: Place[] = [];

    try {
      if (settings.geminiApiKey) {
        const result = await askGemini(
          query,
          places,
          settings.geminiApiKey,
          settings.geminiModel
        );
        reply = result.reply;
        matched = result.placeIds
          .map((id) => places.find((p) => p.id === id))
          .filter((p): p is Place => Boolean(p));
        // Agar AI hech narsa topmasa, mahalliy qidiruv bilan to'ldiramiz
        if (matched.length === 0) {
          const local = localSearch(query, places);
          matched = local.placeIds
            .map((id) => places.find((p) => p.id === id))
            .filter((p): p is Place => Boolean(p));
          if (!reply) reply = local.reply;
        }
      } else {
        const local = localSearch(query, places);
        reply = local.reply;
        matched = local.placeIds
          .map((id) => places.find((p) => p.id === id))
          .filter((p): p is Place => Boolean(p));
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      const local = localSearch(query, places);
      matched = local.placeIds
        .map((id) => places.find((p) => p.id === id))
        .filter((p): p is Place => Boolean(p));
      if (msg.includes("API_KEY") || msg.includes("INVALID")) {
        reply =
          "AI kaliti bilan bog'lanib bo'lmadi, shuning uchun oddiy qidiruvdan foydalandim. " +
          local.reply;
      } else {
        reply = "Vaqtincha AI ga ulanib bo'lmadi, oddiy qidiruv natijalari: " + local.reply;
      }
    }

    const botMsg: ChatMessage = {
      id: slugId("msg"),
      role: "assistant",
      text: reply,
      places: matched,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  }

  return (
    <div className="container-app py-6">
      <div className="mx-auto max-w-3xl">
        {/* Sarlavha */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 text-white">
            <Sparkles size={20} />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">AI Sayohat Yordamchisi</h1>
            <p className="text-sm text-slate-500">
              {usingAI ? "Gemini AI faol" : "Oddiy qidiruv rejimi"} · Chust, Namangan
            </p>
          </div>
        </div>

        {/* API kalit ogohlantirishi */}
        {!usingAI && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>
              Gemini AI kaliti kiritilmagan — hozircha oddiy qidiruv ishlaydi. To'liq
              AI tavsiyalar uchun{" "}
              <Link to="/admin/sozlamalar" className="inline-flex items-center gap-1 font-semibold underline">
                <KeyRound size={13} /> Sozlamalarda
              </Link>{" "}
              API kalitni kiriting.
            </p>
          </div>
        )}

        {/* Chat oynasi */}
        <div
          ref={scrollRef}
          className="mt-4 h-[52vh] min-h-[360px] space-y-4 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-4"
        >
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Bot size={40} className="text-brand-500" />
              <p className="mt-3 max-w-sm text-slate-500">
                Salom! Men BizTurizm AI yordamchisiman. Qanday joy izlayapsiz?
                Oddiy tilda so'rang.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="chip border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-300 hover:text-brand-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className="animate-fade-up">
              <div
                className={`flex gap-2.5 ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    m.role === "user"
                      ? "bg-slate-200 text-slate-600"
                      : "bg-brand-600 text-white"
                  }`}
                >
                  {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </span>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>

              {/* Tavsiya kartochkalari */}
              {m.places && m.places.length > 0 && (
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {m.places.map((p) => (
                    <PlaceCard key={p.id} place={p} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white">
                <Bot size={16} />
              </span>
              <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
              </div>
            </div>
          )}
        </div>

        {/* Kirish maydoni */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Xabar yozing... masalan: kechqurun ovqatlanadigan joy"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading || !input.trim()}>
            <Send size={16} /> Yuborish
          </button>
        </form>

        {/* Takliflar */}
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              disabled={loading}
              className="chip border-slate-200 bg-white text-slate-500 hover:border-brand-300 hover:text-brand-700 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
