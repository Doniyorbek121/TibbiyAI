export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function priceLabel(level: number): string {
  switch (level) {
    case 0:
      return "Bepul";
    case 1:
      return "Arzon";
    case 2:
      return "O'rtacha";
    case 3:
      return "Qimmat";
    default:
      return "—";
  }
}

export function mapsUrl(lat: number, lng: number, name?: string): string {
  const q = name ? encodeURIComponent(name) : `${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}${
    name ? `&query_place_id=${q}` : ""
  }`;
}

export function mapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function slugId(prefix = "place"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
