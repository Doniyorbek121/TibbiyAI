import { type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPinned,
  Settings,
  LogOut,
  Compass,
  ExternalLink,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import { adminLogout } from "../../lib/storage";
import { cn } from "../../lib/utils";

const LINKS = [
  { to: "/admin/panel", label: "Boshqaruv paneli", icon: LayoutDashboard },
  { to: "/admin/joylar", label: "Joylar", icon: MapPinned },
  { to: "/admin/sozlamalar", label: "Sozlamalar", icon: Settings },
];

export function AdminShell({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { setAdmin } = useData();
  const navigate = useNavigate();

  const logout = () => {
    adminLogout();
    setAdmin(false);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Compass size={16} />
          </span>
          <span className="font-extrabold">
            Biz<span className="text-brand-600">Turizm</span>
          </span>
          <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            ADMIN
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100"
                )
              }
            >
              <l.icon size={18} />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-slate-100 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <ExternalLink size={18} /> Saytni ko'rish
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
          >
            <LogOut size={18} /> Chiqish
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/admin/panel" className="lg:hidden">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
                <Compass size={16} />
              </span>
            </Link>
            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <button onClick={logout} className="btn-ghost lg:hidden" aria-label="Chiqish">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 lg:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium",
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-600"
                )
              }
            >
              <l.icon size={16} />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
