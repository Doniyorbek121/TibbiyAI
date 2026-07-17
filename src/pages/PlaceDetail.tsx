import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  Navigation,
  Tag,
  Sparkles,
  Heart,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useI18n } from "../context/I18nContext";
import { categoryEmoji } from "../lib/categories";
import { mapsUrl, mapsDirectionsUrl, cn } from "../lib/utils";
import { useTranslatedPlace } from "../hooks/useAutoTranslate";
import { RatingStars } from "../components/RatingStars";
import { PlaceCard } from "../components/PlaceCard";

const PRICE_KEYS = ["priceFree", "priceCheap", "priceMedium", "priceExpensive"] as const;

export default function PlaceDetail() {
  const { id } = useParams();
  const { getPlace, places, isFavorite, toggleFavorite } = useData();
  const { t, tc } = useI18n();
  const place = id ? getPlace(id) : undefined;
  const favorite = place ? isFavorite(place.id) : false;

  if (!place) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-5xl">🗺️</p>
        <h1 className="mt-4 text-xl font-bold">{t("detailNotFoundTitle")}</h1>
        <Link to="/kashf" className="btn-primary mt-6">
          {t("detailNotFoundBtn")}
        </Link>
      </div>
    );
  }

  return <PlaceDetailInner place={place} places={places} favorite={favorite}
    onToggleFav={() => toggleFavorite(place.id)} t={t} tc={tc} />;
}

function PlaceDetailInner({
  place,
  places,
  favorite,
  onToggleFav,
  t,
  tc,
}: {
  place: NonNullable<ReturnType<ReturnType<typeof useData>["getPlace"]>>;
  places: ReturnType<typeof useData>["places"];
  favorite: boolean;
  onToggleFav: () => void;
  t: ReturnType<typeof useI18n>["t"];
  tc: ReturnType<typeof useI18n>["tc"];
}) {
  const tp = useTranslatedPlace(place);

  const similar = places
    .filter((p) => p.category === place.category && p.id !== place.id)
    .slice(0, 3);

  return (
    <div className="container-app py-6">
      <Link
        to="/kashf"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft size={16} /> {t("detailBack")}
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-5">
        {/* Rasm */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={place.image}
              alt={tp.name}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>

        {/* Ma'lumot */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-brand-200 bg-brand-50 text-brand-700">
              {categoryEmoji(place.category)} {tc(place.category).name}
            </span>
            <span className="chip border-slate-200 bg-slate-50 text-slate-600">
              {t(PRICE_KEYS[place.priceLevel])}
            </span>
            {place.featured && (
              <span className="chip border-amber-200 bg-amber-50 text-amber-700">
                {t("detailFeatured")}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            {tp.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <RatingStars rating={place.rating} size={18} />
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} className="shrink-0" /> {tp.district}, {tp.region}
            </span>
          </div>

          <p className="mt-4 text-slate-700">{tp.description}</p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <span className="text-slate-700">{tp.address}</span>
            </div>
            {place.phone && (
              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-600" />
                <a href={`tel:${place.phone}`} className="text-slate-700 hover:text-brand-700">
                  {place.phone}
                </a>
              </div>
            )}
            {place.workingHours && (
              <div className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-brand-600" />
                <span className="text-slate-700">{place.workingHours}</span>
              </div>
            )}
          </div>

          {place.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-slate-400" />
              {place.tags.map((tag) => (
                <span key={tag} className="chip border-slate-200 bg-white text-slate-500">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href={mapsDirectionsUrl(place.lat, place.lng)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex-1"
            >
              <Navigation size={18} /> {t("detailDirections")}
            </a>
            <a
              href={mapsUrl(place.lat, place.lng, place.name)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline flex-1"
            >
              <MapPin size={18} /> {t("detailViewMap")}
            </a>
          </div>

          <button
            type="button"
            onClick={onToggleFav}
            aria-pressed={favorite}
            className={cn(
              "btn mt-2 w-full border",
              favorite
                ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-600"
            )}
          >
            <Heart size={18} fill={favorite ? "currentColor" : "none"} />
            {favorite ? t("detailInFav") : t("detailAddFav")}
          </button>

          <Link
            to={`/yordamchi?q=${encodeURIComponent(place.name)}`}
            className="btn-ghost mt-2 w-full text-brand-700"
          >
            <Sparkles size={16} /> {t("detailAskSimilar")}
          </Link>
        </div>
      </div>

      {/* Xarita (embed) */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-slate-900">{t("detailLocation")}</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <iframe
            title={t("detailLocation")}
            width="100%"
            height="340"
            loading="lazy"
            className="block"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              place.lng - 0.01
            }%2C${place.lat - 0.008}%2C${place.lng + 0.01}%2C${
              place.lat + 0.008
            }&layer=mapnik&marker=${place.lat}%2C${place.lng}`}
          />
        </div>
      </div>

      {/* O'xshash joylar */}
      {similar.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{t("detailSimilar")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
