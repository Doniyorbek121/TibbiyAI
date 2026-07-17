import type { LangCode } from "./types";

export interface TranslatorStrings {
  nav: string;
  title: string;
  subtitle: string;
  from: string;
  to: string;
  swap: string;
  inputPlaceholder: string;
  mic: string;
  translateBtn: string;
  translating: string;
  listening: string;
  speak: string;
  copy: string;
  clear: string;
  autoSpeak: string;
  resultTitle: string;
  needKey: string;
  micUnsupported: string;
}

// Ovozli tarjimon sahifasi uchun til satrlari (feature-scoped i18n).
export const TRANSLATOR_STRINGS: Record<LangCode, TranslatorStrings> = {
  uz: {
    nav: "Tarjimon", title: "Ovozli tarjimon", subtitle: "Yozing yoki gapiring — 21 tilga ovoz bilan tarjima qiladi",
    from: "Manba til", to: "Maqsad til", swap: "Tillarni almashtirish",
    inputPlaceholder: "Matn yozing yoki mikrofonni bosing...", mic: "Ovozli kiritish",
    translateBtn: "Tarjima qilish", translating: "Tarjima qilinmoqda...", listening: "Tinglanmoqda...",
    speak: "Ovoz chiqarib o'qish", copy: "Nusxa olish", clear: "Tozalash",
    autoSpeak: "Avtomatik ovoz", resultTitle: "Tarjima",
    needKey: "To'liq tarjima uchun Sozlamalarda Gemini AI kalitini kiriting. Kalitsiz faqat keng tarqalgan iboralar tarjima qilinadi.",
    micUnsupported: "Brauzeringiz ovozli kiritishni qo'llab-quvvatlamaydi.",
  },
  ru: {
    nav: "Переводчик", title: "Голосовой переводчик", subtitle: "Пишите или говорите — перевод на 21 язык с озвучкой",
    from: "Исходный язык", to: "Целевой язык", swap: "Поменять языки",
    inputPlaceholder: "Введите текст или нажмите микрофон...", mic: "Голосовой ввод",
    translateBtn: "Перевести", translating: "Перевод...", listening: "Слушаю...",
    speak: "Озвучить", copy: "Копировать", clear: "Очистить",
    autoSpeak: "Авто-озвучка", resultTitle: "Перевод",
    needKey: "Для полного перевода введите ключ Gemini AI в Настройках. Без ключа переводятся только распространённые фразы.",
    micUnsupported: "Ваш браузер не поддерживает голосовой ввод.",
  },
  en: {
    nav: "Translator", title: "Voice translator", subtitle: "Type or speak — translates into 21 languages with voice",
    from: "From", to: "To", swap: "Swap languages",
    inputPlaceholder: "Type text or tap the microphone...", mic: "Voice input",
    translateBtn: "Translate", translating: "Translating...", listening: "Listening...",
    speak: "Read aloud", copy: "Copy", clear: "Clear",
    autoSpeak: "Auto speak", resultTitle: "Translation",
    needKey: "For full translation, enter a Gemini AI key in Settings. Without a key, only common phrases are translated.",
    micUnsupported: "Your browser does not support voice input.",
  },
  zh: {
    nav: "翻译器", title: "语音翻译器", subtitle: "打字或说话——翻译成 21 种语言并朗读",
    from: "源语言", to: "目标语言", swap: "交换语言",
    inputPlaceholder: "输入文字或点击麦克风……", mic: "语音输入",
    translateBtn: "翻译", translating: "翻译中……", listening: "正在聆听……",
    speak: "朗读", copy: "复制", clear: "清除",
    autoSpeak: "自动朗读", resultTitle: "翻译",
    needKey: "如需完整翻译，请在设置中输入 Gemini AI 密钥。没有密钥时仅翻译常用短语。",
    micUnsupported: "您的浏览器不支持语音输入。",
  },
  ar: {
    nav: "المترجم", title: "المترجم الصوتي", subtitle: "اكتب أو تحدّث — يترجم إلى 21 لغة مع النطق",
    from: "من", to: "إلى", swap: "تبديل اللغات",
    inputPlaceholder: "اكتب نصاً أو اضغط على الميكروفون...", mic: "إدخال صوتي",
    translateBtn: "ترجم", translating: "جارٍ الترجمة...", listening: "أستمع...",
    speak: "النطق", copy: "نسخ", clear: "مسح",
    autoSpeak: "نطق تلقائي", resultTitle: "الترجمة",
    needKey: "للترجمة الكاملة، أدخل مفتاح Gemini AI في الإعدادات. بدون مفتاح، تُترجم العبارات الشائعة فقط.",
    micUnsupported: "متصفحك لا يدعم الإدخال الصوتي.",
  },
  tr: {
    nav: "Çevirmen", title: "Sesli çevirmen", subtitle: "Yazın veya konuşun — 21 dile seslendirmeli çeviri",
    from: "Kaynak dil", to: "Hedef dil", swap: "Dilleri değiştir",
    inputPlaceholder: "Metin yazın veya mikrofona dokunun...", mic: "Sesli giriş",
    translateBtn: "Çevir", translating: "Çevriliyor...", listening: "Dinleniyor...",
    speak: "Sesli oku", copy: "Kopyala", clear: "Temizle",
    autoSpeak: "Otomatik seslendir", resultTitle: "Çeviri",
    needKey: "Tam çeviri için Ayarlar'da bir Gemini AI anahtarı girin. Anahtar olmadan yalnızca yaygın ifadeler çevrilir.",
    micUnsupported: "Tarayıcınız sesli girişi desteklemiyor.",
  },
  kk: {
    nav: "Аудармашы", title: "Дауыстық аудармашы", subtitle: "Жазыңыз немесе сөйлеңіз — 21 тілге дауыстап аударады",
    from: "Бастапқы тіл", to: "Мақсатты тіл", swap: "Тілдерді ауыстыру",
    inputPlaceholder: "Мәтін жазыңыз немесе микрофонды басыңыз...", mic: "Дауыстық енгізу",
    translateBtn: "Аудару", translating: "Аударылуда...", listening: "Тыңдалуда...",
    speak: "Дауыстап оқу", copy: "Көшіру", clear: "Тазалау",
    autoSpeak: "Авто дауыс", resultTitle: "Аударма",
    needKey: "Толық аударма үшін Параметрлерде Gemini AI кілтін енгізіңіз. Кілтсіз тек жиі кездесетін тіркестер аударылады.",
    micUnsupported: "Браузеріңіз дауыстық енгізуді қолдамайды.",
  },
  tg: {
    nav: "Тарҷумон", title: "Тарҷумони овозӣ", subtitle: "Нависед ё гап занед — ба 21 забон бо овоз тарҷума мекунад",
    from: "Забони манбаъ", to: "Забони мақсад", swap: "Иваз кардани забонҳо",
    inputPlaceholder: "Матн нависед ё микрофонро пахш кунед...", mic: "Вуруди овозӣ",
    translateBtn: "Тарҷума", translating: "Тарҷума шуда истодааст...", listening: "Гӯш дода истодаам...",
    speak: "Бо овоз хондан", copy: "Нусха", clear: "Тоза кардан",
    autoSpeak: "Овози худкор", resultTitle: "Тарҷума",
    needKey: "Барои тарҷумаи пурра дар Танзимот калиди Gemini AI-ро ворид кунед. Бе калид танҳо ибораҳои маъмул тарҷума мешаванд.",
    micUnsupported: "Браузери шумо вуруди овозиро дастгирӣ намекунад.",
  },
  ja: {
    nav: "翻訳", title: "音声翻訳", subtitle: "入力または発話 — 21言語に音声付きで翻訳",
    from: "翻訳元", to: "翻訳先", swap: "言語を入れ替え",
    inputPlaceholder: "テキストを入力するかマイクをタップ…", mic: "音声入力",
    translateBtn: "翻訳", translating: "翻訳中…", listening: "聞き取り中…",
    speak: "読み上げ", copy: "コピー", clear: "クリア",
    autoSpeak: "自動読み上げ", resultTitle: "翻訳結果",
    needKey: "完全な翻訳には、設定で Gemini AI キーを入力してください。キーがない場合は一般的なフレーズのみ翻訳されます。",
    micUnsupported: "お使いのブラウザは音声入力に対応していません。",
  },
  de: {
    nav: "Übersetzer", title: "Sprachübersetzer", subtitle: "Tippen oder sprechen — Übersetzung in 21 Sprachen mit Stimme",
    from: "Ausgangssprache", to: "Zielsprache", swap: "Sprachen tauschen",
    inputPlaceholder: "Text eingeben oder Mikrofon antippen...", mic: "Spracheingabe",
    translateBtn: "Übersetzen", translating: "Wird übersetzt...", listening: "Höre zu...",
    speak: "Vorlesen", copy: "Kopieren", clear: "Löschen",
    autoSpeak: "Auto-Sprachausgabe", resultTitle: "Übersetzung",
    needKey: "Für die vollständige Übersetzung geben Sie einen Gemini-AI-Schlüssel in den Einstellungen ein. Ohne Schlüssel werden nur gängige Ausdrücke übersetzt.",
    micUnsupported: "Ihr Browser unterstützt keine Spracheingabe.",
  },
  fr: {
    nav: "Traducteur", title: "Traducteur vocal", subtitle: "Écrivez ou parlez — traduction en 21 langues avec la voix",
    from: "Langue source", to: "Langue cible", swap: "Inverser les langues",
    inputPlaceholder: "Saisissez du texte ou touchez le micro...", mic: "Saisie vocale",
    translateBtn: "Traduire", translating: "Traduction...", listening: "Écoute...",
    speak: "Lire à voix haute", copy: "Copier", clear: "Effacer",
    autoSpeak: "Voix automatique", resultTitle: "Traduction",
    needKey: "Pour une traduction complète, saisissez une clé Gemini AI dans les Paramètres. Sans clé, seules les expressions courantes sont traduites.",
    micUnsupported: "Votre navigateur ne prend pas en charge la saisie vocale.",
  },
  es: {
    nav: "Traductor", title: "Traductor de voz", subtitle: "Escribe o habla — traduce a 21 idiomas con voz",
    from: "Idioma de origen", to: "Idioma de destino", swap: "Intercambiar idiomas",
    inputPlaceholder: "Escribe texto o toca el micrófono...", mic: "Entrada de voz",
    translateBtn: "Traducir", translating: "Traduciendo...", listening: "Escuchando...",
    speak: "Leer en voz alta", copy: "Copiar", clear: "Borrar",
    autoSpeak: "Voz automática", resultTitle: "Traducción",
    needKey: "Para una traducción completa, introduce una clave de Gemini AI en Ajustes. Sin clave solo se traducen frases comunes.",
    micUnsupported: "Tu navegador no admite la entrada de voz.",
  },
  ko: {
    nav: "번역기", title: "음성 번역기", subtitle: "입력하거나 말하세요 — 21개 언어로 음성 번역",
    from: "원본 언어", to: "대상 언어", swap: "언어 바꾸기",
    inputPlaceholder: "텍스트를 입력하거나 마이크를 누르세요...", mic: "음성 입력",
    translateBtn: "번역", translating: "번역 중...", listening: "듣는 중...",
    speak: "소리 내어 읽기", copy: "복사", clear: "지우기",
    autoSpeak: "자동 음성", resultTitle: "번역",
    needKey: "전체 번역을 위해 설정에서 Gemini AI 키를 입력하세요. 키가 없으면 일반적인 표현만 번역됩니다.",
    micUnsupported: "브라우저가 음성 입력을 지원하지 않습니다.",
  },
  fa: {
    nav: "مترجم", title: "مترجم صوتی", subtitle: "بنویسید یا صحبت کنید — به ۲۱ زبان با صدا ترجمه می‌کند",
    from: "زبان مبدأ", to: "زبان مقصد", swap: "جابجایی زبان‌ها",
    inputPlaceholder: "متن بنویسید یا میکروفون را بزنید...", mic: "ورودی صوتی",
    translateBtn: "ترجمه", translating: "در حال ترجمه...", listening: "در حال شنیدن...",
    speak: "خواندن با صدا", copy: "کپی", clear: "پاک کردن",
    autoSpeak: "صدای خودکار", resultTitle: "ترجمه",
    needKey: "برای ترجمه کامل، کلید Gemini AI را در تنظیمات وارد کنید. بدون کلید فقط عبارات رایج ترجمه می‌شوند.",
    micUnsupported: "مرورگر شما ورودی صوتی را پشتیبانی نمی‌کند.",
  },
  hi: {
    nav: "अनुवादक", title: "वॉइस अनुवादक", subtitle: "लिखें या बोलें — 21 भाषाओं में आवाज़ के साथ अनुवाद",
    from: "स्रोत भाषा", to: "लक्ष्य भाषा", swap: "भाषाएँ बदलें",
    inputPlaceholder: "टेक्स्ट लिखें या माइक्रोफ़ोन दबाएँ...", mic: "आवाज़ इनपुट",
    translateBtn: "अनुवाद करें", translating: "अनुवाद हो रहा है...", listening: "सुन रहा हूँ...",
    speak: "ज़ोर से पढ़ें", copy: "कॉपी करें", clear: "साफ़ करें",
    autoSpeak: "स्वतः आवाज़", resultTitle: "अनुवाद",
    needKey: "पूर्ण अनुवाद के लिए सेटिंग्स में Gemini AI कुंजी दर्ज करें। कुंजी के बिना केवल सामान्य वाक्यांश अनुवादित होते हैं।",
    micUnsupported: "आपका ब्राउज़र आवाज़ इनपुट का समर्थन नहीं करता।",
  },
  it: {
    nav: "Traduttore", title: "Traduttore vocale", subtitle: "Scrivi o parla — traduce in 21 lingue con la voce",
    from: "Lingua di origine", to: "Lingua di destinazione", swap: "Scambia lingue",
    inputPlaceholder: "Scrivi un testo o tocca il microfono...", mic: "Input vocale",
    translateBtn: "Traduci", translating: "Traduzione...", listening: "In ascolto...",
    speak: "Leggi ad alta voce", copy: "Copia", clear: "Cancella",
    autoSpeak: "Voce automatica", resultTitle: "Traduzione",
    needKey: "Per la traduzione completa, inserisci una chiave Gemini AI nelle Impostazioni. Senza chiave vengono tradotte solo le frasi comuni.",
    micUnsupported: "Il tuo browser non supporta l'input vocale.",
  },
  pt: {
    nav: "Tradutor", title: "Tradutor de voz", subtitle: "Digite ou fale — traduz para 21 idiomas com voz",
    from: "Idioma de origem", to: "Idioma de destino", swap: "Trocar idiomas",
    inputPlaceholder: "Digite um texto ou toque no microfone...", mic: "Entrada de voz",
    translateBtn: "Traduzir", translating: "Traduzindo...", listening: "Ouvindo...",
    speak: "Ler em voz alta", copy: "Copiar", clear: "Limpar",
    autoSpeak: "Voz automática", resultTitle: "Tradução",
    needKey: "Para tradução completa, insira uma chave Gemini AI nas Configurações. Sem chave, apenas frases comuns são traduzidas.",
    micUnsupported: "Seu navegador não suporta entrada de voz.",
  },
  ky: {
    nav: "Котормочу", title: "Үн котормочу", subtitle: "Жазыңыз же сүйлөңүз — 21 тилге үн менен которот",
    from: "Баштапкы тил", to: "Максаттуу тил", swap: "Тилдерди алмаштыруу",
    inputPlaceholder: "Текст жазыңыз же микрофонду басыңыз...", mic: "Үн киргизүү",
    translateBtn: "Которуу", translating: "Которулууда...", listening: "Угуп жатам...",
    speak: "Үн менен окуу", copy: "Көчүрүү", clear: "Тазалоо",
    autoSpeak: "Авто үн", resultTitle: "Котормо",
    needKey: "Толук котормо үчүн Жөндөөлөрдө Gemini AI ачкычын киргизиңиз. Ачкычсыз көп колдонулган сөз айкаштары гана которулат.",
    micUnsupported: "Браузериңиз үн киргизүүнү колдобойт.",
  },
  tk: {
    nav: "Terjimeçi", title: "Sesli terjimeçi", subtitle: "Ýazyň ýa-da gepläň — 21 dile ses bilen terjime edýär",
    from: "Çeşme dil", to: "Maksat dil", swap: "Dilleri çalyş",
    inputPlaceholder: "Tekst ýazyň ýa-da mikrofona basyň...", mic: "Sesli giriş",
    translateBtn: "Terjime et", translating: "Terjime edilýär...", listening: "Diňleýärin...",
    speak: "Sesli oka", copy: "Göçür", clear: "Arassala",
    autoSpeak: "Awto ses", resultTitle: "Terjime",
    needKey: "Doly terjime üçin Sazlamalarda Gemini AI açaryny giriziň. Açarsyz diňe umumy sözlemler terjime edilýär.",
    micUnsupported: "Brauzeriňiz sesli girişi goldamaýar.",
  },
  az: {
    nav: "Tərcüməçi", title: "Səsli tərcüməçi", subtitle: "Yazın və ya danışın — 21 dilə səslə tərcümə edir",
    from: "Mənbə dil", to: "Hədəf dil", swap: "Dilləri dəyiş",
    inputPlaceholder: "Mətn yazın və ya mikrofona toxunun...", mic: "Səsli giriş",
    translateBtn: "Tərcümə et", translating: "Tərcümə olunur...", listening: "Dinləyirəm...",
    speak: "Səslə oxu", copy: "Kopyala", clear: "Təmizlə",
    autoSpeak: "Avto səs", resultTitle: "Tərcümə",
    needKey: "Tam tərcümə üçün Parametrlərdə Gemini AI açarı daxil edin. Açarsız yalnız geniş yayılmış ifadələr tərcümə olunur.",
    micUnsupported: "Brauzeriniz səsli girişi dəstəkləmir.",
  },
  uk: {
    nav: "Перекладач", title: "Голосовий перекладач", subtitle: "Пишіть або говоріть — переклад на 21 мову з озвучкою",
    from: "Мова джерела", to: "Цільова мова", swap: "Поміняти мови",
    inputPlaceholder: "Введіть текст або торкніться мікрофона...", mic: "Голосове введення",
    translateBtn: "Перекласти", translating: "Переклад...", listening: "Слухаю...",
    speak: "Озвучити", copy: "Копіювати", clear: "Очистити",
    autoSpeak: "Авто-озвучка", resultTitle: "Переклад",
    needKey: "Для повного перекладу введіть ключ Gemini AI у Налаштуваннях. Без ключа перекладаються лише поширені фрази.",
    micUnsupported: "Ваш браузер не підтримує голосове введення.",
  },
};
