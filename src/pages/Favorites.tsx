import { Link } from "react-router-dom";
import { Heart, Compass } from "lucide-react";
import { useData } from "../context/DataContext";
import { PlaceCard } from "../components/PlaceCard";

export default function Favorites() {
  const { favoritePlaces } = useData();

  return (
    <div className="container-app py-8">
      <div className="flex items-center gap-2">
        <Heart size={24} className="text-rose-500" fill="currentColor" />
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Sevimlilar</h1>
      </div>
      <p className="mt-1 text-slate-500">
        {favoritePlaces.length > 0
          ? `Saqlangan ${favoritePlaces.length} ta maskan`
          : "Yoqtirgan joylaringizni bu yerda saqlab qo'ying"}
      </p>

      {favoritePlaces.length === 0 ? (
        <div className="mt-16 text-center text-slate-500">
          <p className="text-5xl">🤍</p>
          <p className="mt-3 font-medium">Hozircha sevimli joylar yo'q</p>
          <p className="text-sm">
            Maskanlardagi yurakcha belgisini bosib, ularni bu yerga qo'shing.
          </p>
          <Link to="/kashf" className="btn-primary mt-6 inline-flex">
            <Compass size={18} /> Joylarni kashf etish
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favoritePlaces.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  );
}
