import { useState } from "react";
import { KeyRound, Save, Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";
import { useData } from "../../context/DataContext";
import { AdminShell } from "./AdminShell";

const MODELS = [
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash (tez, tavsiya etiladi)" },
  { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite (arzon)" },
  { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro (kuchli)" },
];

export default function AdminSettings() {
  const { settings, updateSettings } = useData();
  const [apiKey, setApiKey] = useState(settings.geminiApiKey);
  const [model, setModel] = useState(settings.geminiModel);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const save = () => {
    updateSettings({ geminiApiKey: apiKey.trim(), geminiModel: model });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const testKey = async () => {
    if (!apiKey.trim()) {
      setTestResult("Avval API kalitni kiriting.");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
          apiKey.trim()
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Salom, ishlayapsanmi? Bir so'z bilan javob ber." }] }],
          }),
        }
      );
      if (res.ok) {
        setTestResult("✅ Kalit ishlayapti! AI tavsiyalar faol.");
      } else if (res.status === 400 || res.status === 403) {
        setTestResult("❌ Kalit noto'g'ri yoki ruxsat yo'q. Qayta tekshiring.");
      } else {
        setTestResult(`⚠️ Xatolik yuz berdi (${res.status}).`);
      }
    } catch {
      setTestResult("⚠️ Tarmoqqa ulanib bo'lmadi.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <AdminShell title="Sozlamalar">
      <div className="max-w-2xl space-y-6">
        {/* Gemini AI */}
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <Sparkles size={18} />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">Gemini AI integratsiyasi</h2>
              <p className="text-sm text-slate-500">
                AI yordamchisi foydalanuvchi so'roviga qarab joy tavsiya qilishi uchun kalit kerak.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="label">
                <KeyRound size={13} className="mr-1 inline" /> Gemini API kaliti
              </label>
              <input
                type="password"
                className="input font-mono"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
              />
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline"
              >
                Google AI Studio dan bepul kalit oling <ExternalLink size={12} />
              </a>
            </div>

            <div>
              <label className="label">AI modeli</label>
              <select
                className="input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {testResult && (
              <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                {testResult}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button onClick={save} className="btn-primary">
                {saved ? (
                  <>
                    <CheckCircle2 size={18} /> Saqlandi
                  </>
                ) : (
                  <>
                    <Save size={18} /> Saqlash
                  </>
                )}
              </button>
              <button onClick={testKey} disabled={testing} className="btn-outline">
                {testing ? "Tekshirilmoqda..." : "Kalitni tekshirish"}
              </button>
            </div>
          </div>
        </div>

        {/* Ma'lumot */}
        <div className="card border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Maxfiylik haqida</p>
          <p className="mt-1">
            API kalit faqat shu brauzerda (localStorage) saqlanadi va to'g'ridan-to'g'ri
            Google Gemini xizmatiga yuboriladi. Ishlab chiqarish muhitida kalitni
            backend orqali himoyalash tavsiya etiladi.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
