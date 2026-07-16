import type { Translation } from "../types";

export const tr: Translation = {
  navHome: "Ana sayfa",
  navExplore: "Keşfet",
  navAssistant: "AI Asistan",
  navFavorites: "Favoriler",
  navAdmin: "Yönetim",

  langLabel: "Dil",

  priceFree: "Ücretsiz",
  priceCheap: "Ucuz",
  priceMedium: "Orta",
  priceExpensive: "Pahalı",

  cardDetails: "Detaylar →",
  featuredBadge: "⭐ Öne çıkan",

  homeHeroBadge: "Gemini AI ile çalışır",
  homeHeroTitle: "Özbekistan'ı bir AI asistanıyla keşfedin",
  homeHeroSubtitle:
    "Restoran, otel, ziyaretgâh ya da gezilecek bir yer mi lazım? Sadece sorun — fotoğrafı, adresi ve konumuyla önerelim.",
  homeSearchPlaceholder: "Örneğin: milli yemekler sunan bir restoran lazım...",
  homeAskBtn: "Sor",
  homeQuick1: "Bir restoran lazım",
  homeQuick2: "Ziyaretgâh ve kutsal yerler",
  homeQuick3: "Uygun fiyatlı otel",
  homeQuick4: "Çust bıçağını nereden alabilirim?",
  homeCatsTitle: "Kategoriler",
  homeCatsSubtitle: "Ne aradığınızı seçin",
  homeSeeAll: "Tümü →",
  homeFeaturedTitle: "Öne çıkan yerler",
  homeFeaturedRegion: "Çust ilçesi, Namangan",
  homeAllLink: "Tümü →",
  homeCtaTitle: "Tam olarak neye ihtiyacınız olduğundan emin değil misiniz?",
  homeCtaText:
    "AI asistanımıza sade bir dille sorun — \"akşam ailemle dinlenebileceğim bir yer\" deseniz bile size en uygun seçenekleri bulur.",
  homeCtaBtn: "AI asistanı aç",

  exploreTitle: "Keşfet",
  exploreSubtitle: "Çust ilçesinde (Namangan) {count} yer",
  exploreSearchPlaceholder: "İsim, açıklama veya adrese göre arayın...",
  exploreSortRating: "Puana göre",
  exploreSortName: "İsme göre",
  exploreSortPrice: "Fiyata göre",
  exploreAll: "Tümü",
  exploreEmptyTitle: "Hiçbir şey bulunamadı",
  exploreEmptyText: "Başka bir anahtar kelime veya kategori deneyin.",

  detailBack: "Geri",
  detailFeatured: "⭐ Öne çıkan",
  detailDirections: "Yol tarifi al",
  detailViewMap: "Haritada göster",
  detailAddFav: "Favorilere ekle",
  detailInFav: "Favorilerde",
  detailAskSimilar: "AI'ya benzer yerleri sor",
  detailLocation: "Konum",
  detailSimilar: "Benzer yerler",
  detailNotFoundTitle: "Yer bulunamadı",
  detailNotFoundBtn: "Keşfet'e dön",

  favTitle: "Favoriler",
  favSubtitleCount: "{count} kayıtlı yer",
  favSubtitleEmpty: "Beğendiğiniz yerleri burada saklayın",
  favEmptyTitle: "Henüz favori yer yok",
  favEmptyText: "Bir yerdeki kalp simgesine dokunarak buraya ekleyin.",
  favDiscoverBtn: "Yerleri keşfet",
  favAdd: "Favorilere ekle",
  favRemove: "Favorilerden çıkar",

  asTitle: "AI Seyahat Asistanı",
  asAiActive: "Gemini AI aktif",
  asLocalMode: "Basit arama modu",
  asRegion: "Çust, Namangan",
  asApiWarnBefore:
    "Gemini AI anahtarı girilmedi — şimdilik basit arama çalışıyor. Tam AI önerileri için API anahtarınızı şuraya girin:",
  asApiWarnSettings: "Ayarlar",
  asApiWarnAfter: "",
  asGreeting:
    "Merhaba! Ben BizTurizm AI asistanıyım. Nasıl bir yer arıyorsunuz? Sade bir dille sorun.",
  asInputPlaceholder: "Bir mesaj yazın... örn: bu akşam yemek yiyebileceğim bir yer",
  asSend: "Gönder",
  asSug1: "Milli yemekler sunan bir restoran lazım",
  asSug2: "Uygun fiyatlı bir otel arıyorum",
  asSug3: "Bana ziyaretgâhları göster",
  asSug4: "Çust bıçağını nereden alabilirim?",
  asSug5: "Ailemle dinlenebileceğim bir yer",
  asSug6: "Doğada bir yürüyüş",
  asFoundReply: "İsteğinize uygun {count} yer buldum. Aşağıda görebilirsiniz 👇",
  asNotFoundReply:
    "Maalesef uygun bir yer bulunamadı. Farklı kelimeler deneyin (örneğin: restoran, otel, ziyaretgâh).",
  asAiConnectFail:
    "AI anahtarına bağlanılamadı, bu yüzden basit aramayı kullandım.",
  asAiTempFail: "AI'ya geçici olarak ulaşılamadı, basit arama sonuçları:",

  footerTagline:
    "Bir AI asistanıyla Özbekistan genelinde seyahat yerleri bulun. Şimdilik Namangan vilayetinin Çust ilçesi tamamen kapsanmıştır.",
  footerSections: "Bölümler",
  footerRegion: "Bölge",
  footerRegionItem1: "Namangan vilayeti",
  footerRegionItem2: "Çust ilçesi",
  footerRegionItem3: "Yakında: tüm Özbekistan",
  footerAiTitle: "AI ile çalışır",
  footerAiText:
    "Gemini AI yardımıyla sorunuza göre en uygun yerleri önerir.",
  footerRights: "Tüm hakları saklıdır.",

  nfTitle: "Sayfa bulunamadı",
  nfText: "Aradığınız sayfa mevcut değil veya taşınmış.",
  nfBtn: "Ana sayfaya dön",

  categories: {
    oshxona: { name: "Yeme & içme", description: "Milli yemekler, çayhaneler, kafeler ve restoranlar" },
    mehmonxona: { name: "Oteller", description: "Oteller, hosteller ve misafirhaneler" },
    ziyoratgoh: { name: "Ziyaretgâhlar", description: "Camiler, türbeler ve kutsal mekânlar" },
    tarixiy: { name: "Tarihi yerler", description: "Antik anıtlar, müzeler ve anıtlar" },
    tabiat: { name: "Doğa", description: "Dağlar, dereler, pınarlar ve manzaralı yerler" },
    hunarmandchilik: { name: "El sanatları", description: "Çust bıçağı, takke ve halk el sanatları atölyeleri" },
    dam_olish: { name: "Dinlenme", description: "Parklar, bahçeler ve ailece dinlenme yerleri" },
    xaridlar: { name: "Alışveriş", description: "Pazarlar, dükkânlar ve alışveriş merkezleri" },
  },
};
