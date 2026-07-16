import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Compass, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useData } from "../../context/DataContext";
import { adminLogin } from "../../lib/storage";

export default function AdminLogin() {
  const { admin, setAdmin } = useData();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (admin) navigate("/admin/panel", { replace: true });
  }, [admin, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      setAdmin(true);
      navigate("/admin/panel");
    } else {
      setError("Parol noto'g'ri. Qayta urinib ko'ring.");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-700"
        >
          <ArrowLeft size={16} /> Saytga qaytish
        </Link>
        <div className="card p-7">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white">
              <ShieldCheck size={24} />
            </span>
            <h1 className="mt-4 flex items-center gap-1.5 text-xl font-bold text-slate-900">
              <Compass size={18} className="text-brand-600" /> BizTurizm Admin
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Boshqaruv paneliga kirish uchun parolni kiriting
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label">Parol</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="input pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">
              Kirish
            </button>
          </form>

          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
            Demo parol: <span className="font-mono font-semibold text-slate-700">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
