import type { Place } from "./types";
import { categoryName } from "./categories";

// Gemini AI integratsiyasi.
// Model foydalanuvchi so'roviga qarab mavjud joylardan mosini tanlaydi va
// qat'iy JSON formatida qaytaradi. Shu tariqa AI faqat bazadagi haqiqiy
// joylarni tavsiya qiladi (rasm, nom, lokatsiya bilan).

export interface GeminiResult {
  reply: string;
  placeIds: string[];
}

function buildPlacesContext(places: Place[]): string {
  return places
    .map(
      (p) =>
        `- id: "${p.id}" | nom: "${p.name}" | turi: ${categoryName(
          p.category
        )} | manzil: ${p.district}, ${p.region}, ${p.address} | reyting: ${
          p.rating
        } | tavsif: ${p.description}`
    )
    .join("\n");
}

const SYSTEM_PROMPT = `Sen "BizTurizm" — O'zbekiston bo'yicha sayohat yordamchisisan.
Foydalanuvchi o'zbek tilida biror joy so'raydi (masalan: oshxona, mehmonxona, ziyoratgoh, tabiat, hunarmandchilik, xaridlar va h.k.).
Quyida bazadagi joylar ro'yxati beriladi. Faqat shu ro'yxatdagi joylardan foydalanuvchi so'roviga eng mos keladiganlarini tanla.
Muhim qoidalar:
1. Faqat berilgan ro'yxatdagi id larni ishlat. O'zingdan joy o'ylab topma.
2. Agar mos joy bo'lmasa, placeIds bo'sh bo'lsin va reply da chiroyli tarzda tushuntir.
3. reply — do'stona, qisqa (2-4 gap), o'zbek tilida bo'lsin. Kartochkalar alohida ko'rsatiladi, shuning uchun reply da har bir joyni batafsil sanab o'tirma.
4. Javobni QAT'IY JSON formatida ber, boshqa hech narsa yozma:
{"reply": "...", "placeIds": ["id1","id2"]}`;

export async function askGemini(
  userQuery: string,
  places: Place[],
  apiKey: string,
  model: string
): Promise<GeminiResult> {
  if (!apiKey) {
    throw new Error("NO_API_KEY");
  }

  const context = buildPlacesContext(places);
  const prompt = `${SYSTEM_PROMPT}

BAZADAGI JOYLAR:
${context}

FOYDALANUVCHI SO'ROVI: "${userQuery}"

JSON javob:`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    if (res.status === 400 || res.status === 403) {
      throw new Error("INVALID_API_KEY");
    }
    throw new Error(`GEMINI_ERROR_${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return parseGeminiJson(text);
}

function parseGeminiJson(text: string): GeminiResult {
  try {
    // Ba'zan model markdown ichida qaytaradi — tozalaymiz.
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");
    const jsonStr =
      jsonStart >= 0 && jsonEnd >= 0
        ? cleaned.slice(jsonStart, jsonEnd + 1)
        : cleaned;
    const parsed = JSON.parse(jsonStr);
    return {
      reply: typeof parsed.reply === "string" ? parsed.reply : "",
      placeIds: Array.isArray(parsed.placeIds)
        ? parsed.placeIds.filter((x: unknown) => typeof x === "string")
        : [],
    };
  } catch {
    return { reply: text || "Kechirasiz, javobni tushunolmadim.", placeIds: [] };
  }
}

// —————————————————————————————————————————————————————————
// Zaxira (fallback) qidiruv — API kaliti bo'lmaganda yoki xato bo'lganda
// oddiy kalit so'z bo'yicha mahalliy qidiruv ishlaydi.
// —————————————————————————————————————————————————————————

const KEYWORD_MAP: Record<string, string[]> = {
  oshxona: ["osh", "ovqat", "taom", "restoran", "kafe", "choyxona", "yeyish", "och"],
  mehmonxona: ["mehmonxona", "hotel", "yotoq", "tunash", "qo'nish", "guesthouse"],
  ziyoratgoh: ["ziyorat", "masjid", "maqbara", "muqaddas", "diniy"],
  tarixiy: ["tarix", "muzey", "obida", "yodgorlik", "qadimiy"],
  tabiat: ["tabiat", "tog'", "soy", "buloq", "sayil", "piknik", "salqin", "havo"],
  hunarmandchilik: ["pichoq", "do'ppi", "hunar", "usta", "sovg'a", "milliy buyum"],
  dam_olish: ["dam", "bog'", "park", "sport", "attraksion", "oila"],
  xaridlar: ["bozor", "xarid", "do'kon", "savdo", "sotib olish"],
};

export function localSearch(userQuery: string, places: Place[]): GeminiResult {
  const q = userQuery.toLowerCase();
  const matchedCategories = new Set<string>();

  for (const [cat, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((k) => q.includes(k))) {
      matchedCategories.add(cat);
    }
  }

  let results: Place[];
  if (matchedCategories.size > 0) {
    results = places.filter((p) => matchedCategories.has(p.category));
  } else {
    // Umumiy matn qidiruvi
    results = places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  results = results.sort((a, b) => b.rating - a.rating).slice(0, 6);

  const reply =
    results.length > 0
      ? `So'rovingiz bo'yicha ${results.length} ta mos joyni topdim. Quyida ko'rishingiz mumkin 👇`
      : "Afsuski, so'rovingizga mos joy topilmadi. Boshqacha so'zlar bilan urinib ko'ring (masalan: oshxona, mehmonxona, ziyoratgoh).";

  return { reply, placeIds: results.map((p) => p.id) };
}
