import { Navigate } from "react-router";
import { useAuth } from "../hooks/useStores";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
