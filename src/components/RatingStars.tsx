import { Star } from "lucide-react";

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-amber-500">
      <Star size={size} className="fill-amber-400 stroke-amber-400" />
      <span className="font-semibold text-slate-700">{rating.toFixed(1)}</span>
    </span>
  );
}
