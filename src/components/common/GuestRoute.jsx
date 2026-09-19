import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * GuestRoute prevents already authenticated users from accessing
 * authentication pages (login, register). It automatically redirects them
 * to their appropriate dashboard.
 */
export default function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    if (user.role === "volunteer") {
      return <Navigate to="/volunteer/dashboard" replace />;
    }
    if (user.role === "organization") {
      return <Navigate to="/organizer/dashboard" replace />;
    }
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
