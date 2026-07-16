import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useData } from "../../context/DataContext";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { admin } = useData();
  if (!admin) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
