import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PlaceDetail from "./pages/PlaceDetail";
import Assistant from "./pages/Assistant";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPlaces from "./pages/admin/AdminPlaces";
import AdminPlaceForm from "./pages/admin/AdminPlaceForm";
import AdminSettings from "./pages/admin/AdminSettings";
import { RequireAdmin } from "./pages/admin/RequireAdmin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kashf" element={<Explore />} />
          <Route path="/joy/:id" element={<PlaceDetail />} />
          <Route path="/yordamchi" element={<Assistant />} />
          <Route path="/sevimli" element={<Favorites />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/panel"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/joylar"
            element={
              <RequireAdmin>
                <AdminPlaces />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/joylar/yangi"
            element={
              <RequireAdmin>
                <AdminPlaceForm />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/joylar/:id"
            element={
              <RequireAdmin>
                <AdminPlaceForm />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/sozlamalar"
            element={
              <RequireAdmin>
                <AdminSettings />
              </RequireAdmin>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
