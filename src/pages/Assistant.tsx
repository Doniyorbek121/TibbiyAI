import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Sparkles, Send, Bot, User, Info, KeyRound } from "lucide-react";
import { useData } from "../context/DataContext";
import { useI18n } from "../context/I18nContext";
import { LANGUAGES } from "../i18n";
import { askGemini, localSearch } from "../lib/gemini";
import type { ChatMessage, Place } from "../lib/types";
import { PlaceCard } from "../components/PlaceCard";
import { slugId } from "../lib/utils";

export default function Assistant() {
  const { places, settings } = useData();
  const { t, lang } = useI18n();
  const [params] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const usingAI = Boolean(settings.geminiApiKey);
  const replyLanguage = LANGUAGES.find((l) => l.code === lang)?.english ?? "Uzbek";

  const suggestions = [
    t("asSug1"), t("asSug2"), t("asSug3"),
    t("asSug4"), t("asSug5"), t("asSug6"),
  ];

  useEffect(() => {
    const q = params.get("q");
    if (q) handleSend(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function pickPlaces(ids: string[]): Place[] {
    return ids
      .map((id) => places.find((p) => p.id === id))
      .filter((p): p is Place => Boolean(p));
  }

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
          settings.geminiModel,
          replyLanguage
        );
        reply = result.reply;
        matched = pickPlaces(result.placeIds);
        if (matched.length === 0) {
          const local = localSearch(query, places);
          matched = pickPlaces(local.placeIds);
        }
        if (!reply) {
          reply = matched.length
            ? t("asFoundReply", { count: matched.length })
            : t("asNotFoundReply");
        }
      } else {
        const local = localSearch(query, places);
        matched = pickPlaces(local.placeIds);
        reply = matched.length
          ? t("asFoundReply", { count: matched.length })
          : t("asNotFoundReply");
      }
    } catch {
      const local = localSearch(query, places);
      matched = pickPlaces(local.placeIds);
      const localReply = matched.length
        ? t("asFoundReply", { count: matched.length })
        : t("asNotFoundReply");
      reply = `${t("asAiConnectFail")} ${localReply}`;
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
            <h1 className="text-xl font-bold text-slate-900">{t("asTitle")}</h1>
            <p className="text-sm text-slate-500">
              {usingAI ? t("asAiActive") : t("asLocalMode")} · {t("asRegion")}
            </p>
          </div>
        </div>

        {/* API kalit ogohlantirishi */}
        {!usingAI && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>
              {t("asApiWarnBefore")}{" "}
              <Link to="/admin/sozlamalar" className="inline-flex items-center gap-1 font-semibold underline">
                <KeyRound size={13} /> {t("asApiWarnSettings")}
              </Link>{" "}
              {t("asApiWarnAfter")}
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
              <p className="mt-3 max-w-sm text-slate-500">{t("asGreeting")}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.slice(0, 4).map((sg) => (
                  <button
                    key={sg}
                    onClick={() => handleSend(sg)}
                    className="chip border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-300 hover:text-brand-700"
                  >
                    {sg}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className="animate-fade-up">
              <div className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    m.role === "user" ? "bg-slate-200 text-slate-600" : "bg-brand-600 text-white"
                  }`}
                >
                  {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </span>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>

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
            placeholder={t("asInputPlaceholder")}
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            disabled={loading}
          />
          <button type="submit" className="btn-primary shrink-0" disabled={loading || !input.trim()}>
            <Send size={16} /> {t("asSend")}
          </button>
        </form>

        {/* Takliflar */}
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((sg) => (
            <button
              key={sg}
              onClick={() => handleSend(sg)}
              disabled={loading}
              className="chip border-slate-200 bg-white text-slate-500 hover:border-brand-300 hover:text-brand-700 disabled:opacity-50"
            >
              {sg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
