import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./user-context"; // Pfad zu deinem Context anpassen
import type { JSX } from "react/jsx-runtime";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user.isLoggedIn) {
    // Leitet sofort um und merkt sich die Ursprungs-URL
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}