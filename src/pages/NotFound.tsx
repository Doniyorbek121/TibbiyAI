import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Sahifa topilmadi</h1>
      <p className="mt-2 text-slate-500">
        Siz izlagan sahifa mavjud emas yoki ko'chirilgan.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
