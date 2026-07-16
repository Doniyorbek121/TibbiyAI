# 🧭 BizTurizm — O'zbekiston sayohat platformasi

**BizTurizm** — Gemini AI yordamchisi bilan ishlaydigan sayohat platformasi. Foydalanuvchi
oddiy tilda savol beradi ("menga oshxona kerak", "ziyoratgoh joylar", "arzon mehmonxona"),
AI esa bazadagi joylardan eng mosini **rasmi, nomi, manzili va xarita lokatsiyasi** bilan
tavsiya qiladi.

Hozircha platforma **Namangan viloyati, Chust tumani** uchun to'liq to'ldirilgan va butun
O'zbekistonga kengaytiriladigan tuzilmaga ega.

---

## ✨ Asosiy imkoniyatlar

- **AI Yordamchi (chat)** — Gemini AI bilan integratsiya. Savolga qarab joylarni tavsiya qiladi.
  API kaliti bo'lmasa ham, o'rnatilgan **oddiy qidiruv (fallback)** ishlaydi.
- **Foydalanuvchi web + mobil** — bitta responsiv PWA. Telefonga "ilova" sifatida o'rnatish mumkin.
- **Sevimlilar** — yoqtirgan joylarni yurakcha bilan saqlash. Ular alohida sahifada ko'rinadi
  va brauzerda (localStorage) saqlanadi.
- **21 tilli interfeys** — o'zbek, rus, ingliz, xitoy, arab, turk, qozoq, tojik, yapon, nemis,
  fransuz, ispan, koreys, fors, hind, italyan, portugal, qirg'iz, turkman, ozarbayjon, ukrain.
  Arab va fors uchun **RTL** (o'ngdan chapga) qo'llab-quvvatlanadi. Til brauzerda saqlanadi.
- **Avtomatik kontent tarjimasi** — admin o'zbekcha qo'shgan joylar, tavsiflar, hudud/tuman nomlari
  foydalanuvchi tanlagan tilga **Gemini AI** orqali avtomatik tarjima qilinadi va keshlanadi
  (kalit bo'lmasa asl matn ko'rsatiladi).
- **Ovozli tarjimon** (`/tarjimon`) — 21 til orasida tarjima. Mikrofon orqali **gapirib**
  kiritish (nutqdan matnga) va natijani **ovoz bilan** eshitish (matndan nutqqa). Masalan
  o'zbekcha "salom" desangiz, koreyscha "안녕하세요" deb ovozda gapiradi. Kalitsiz ham keng
  tarqalgan iboralar (oflayn lug'at) ishlaydi.
- **Admin panel** — joylarni qo'shish / tahrirlash / o'chirish, statistika, Gemini sozlamalari.
- **Kategoriyalar** — oshxona, mehmonxona, ziyoratgoh, tarixiy joylar, tabiat,
  hunarmandchilik, dam olish, xaridlar.
- **Har bir joy** — rasm, reyting, narx darajasi, telefon, ish vaqti, teglar, xarita (OpenStreetMap)
  va Google Maps "yo'l ko'rsatish" tugmasi.

---

## 🚀 Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # ishlab chiqarish uchun
npm run preview   # build natijasini ko'rish
```

## 🔑 Gemini AI kalitini ulash

To'liq AI tavsiyalar uchun Gemini API kaliti kerak:

1. [Google AI Studio](https://aistudio.google.com/apikey) dan **bepul** kalit oling.
2. Ilovada **Admin → Sozlamalar** bo'limiga kirib kalitni kiriting (brauzerda saqlanadi), **yoki**
3. Loyiha ildizida `.env` fayl yarating (`.env.example` dan nusxa oling):

```
VITE_GEMINI_API_KEY=AIza...
VITE_GEMINI_MODEL=gemini-2.0-flash
```

> Kalit kiritilmasa, ilova avtomatik ravishda kalit so'z bo'yicha oddiy qidiruvga o'tadi —
> demak AI'siz ham to'liq ishlaydi.

## 👤 Admin panelga kirish

- Manzil: `/admin`
- Demo parol: **`admin123`**

> Eslatma: demo autentifikatsiya faqat frontend darajasida. Ishlab chiqarishda parol va
> API kalitni **backend** orqali himoyalash tavsiya etiladi.

---

## 🏗️ Texnologiyalar

| Qatlam | Texnologiya |
|--------|-------------|
| Frontend | React 18 + TypeScript |
| Build | Vite 6 |
| Dizayn | Tailwind CSS |
| Routing | React Router |
| Ikonalar | lucide-react |
| AI | Google Gemini API |
| Xarita | OpenStreetMap embed + Google Maps havolalari |
| Ma'lumot | localStorage (backendga oson ko'chiriladigan qatlam) |

## 📂 Loyiha tuzilmasi

```
src/
├── components/       # Navbar, Footer, PlaceCard, RatingStars, LanguageSwitcher
├── context/          # DataContext (joylar, sozlamalar), I18nContext (til, t())
├── data/             # seedPlaces.ts — Chust tumani boshlang'ich ma'lumotlari
├── hooks/            # useAutoTranslate — joylarni avtomatik tarjima qilish
├── i18n/             # 21 til fayli (locales/), types, languages, translator
├── lib/              # types, categories, gemini, storage, translate, speech, utils
├── pages/            # Home, Explore, PlaceDetail, Assistant, Favorites, Translator
│   └── admin/        # Login, Dashboard, Places, PlaceForm, Settings
├── App.tsx           # Routing
└── main.tsx          # Kirish nuqtasi
```

## 🗺️ Kelajak rejalari

- Butun O'zbekiston bo'yicha viloyat/tuman tanlash
- Backend (autentifikatsiya, ma'lumotlar bazasi, rasm yuklash)
- Foydalanuvchi sharhlari va reytinglari
- Ovozli tarjimon uchun qo'shimcha oflayn lug'at (kalitsiz kengroq qamrov)
