import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";
import type { Place } from "../lib/types";
import { categoryEmoji, categoryName } from "../lib/categories";
import { priceLabel, cn } from "../lib/utils";
import { useData } from "../context/DataContext";
import { RatingStars } from "./RatingStars";

export function PlaceCard({ place }: { place: Place }) {
  const { isFavorite, toggleFavorite } = useData();
  const favorite = isFavorite(place.id);

  const handleFavorite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(place.id);
  };

  return (
    <Link
      to={`/joy/${place.id}`}
      className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 chip border-transparent bg-white/90 text-slate-700 backdrop-blur">
          {categoryEmoji(place.category)} {categoryName(place.category)}
        </span>
        {place.featured && (
          <span className="absolute right-3 top-3 chip border-transparent bg-brand-600 text-white">
            ⭐ Tavsiya
          </span>
        )}
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          aria-pressed={favorite}
          className={cn(
            "absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110",
            favorite ? "text-rose-500" : "text-slate-400 hover:text-rose-500"
          )}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight text-slate-900 line-clamp-1">
            {place.name}
          </h3>
          <RatingStars rating={place.rating} />
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} /> {place.district}, {place.region}
        </p>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {place.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="chip border-slate-200 bg-slate-50 text-slate-600">
            {priceLabel(place.priceLevel)}
          </span>
          <span className="text-sm font-semibold text-brand-700 group-hover:underline">
            Batafsil →
          </span>
        </div>
      </div>
    </Link>
  );
}
