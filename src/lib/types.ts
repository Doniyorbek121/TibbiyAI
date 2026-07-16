// BizTurizm platformasi uchun asosiy ma'lumot turlari

export type CategoryId =
  | "oshxona"
  | "mehmonxona"
  | "ziyoratgoh"
  | "tarixiy"
  | "tabiat"
  | "hunarmandchilik"
  | "dam_olish"
  | "xaridlar";

export interface Category {
  id: CategoryId;
  name: string; // O'zbekcha nomi
  emoji: string;
  description: string;
}

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  region: string; // Viloyat, masalan "Namangan"
  district: string; // Tuman, masalan "Chust"
  address: string;
  description: string;
  image: string; // rasm URL
  lat: number;
  lng: number;
  rating: number; // 0..5
  priceLevel: 0 | 1 | 2 | 3; // 0 - bepul, 1 - arzon, 2 - o'rtacha, 3 - qimmat
  phone?: string;
  workingHours?: string;
  tags: string[];
  featured?: boolean;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  places?: Place[]; // AI tavsiya qilgan joylar
  createdAt: number;
}
