import useAuth from "../../context/auth";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children, route, client }) {
  const { admin } = useAuth();

  if (client) return children;

  if (admin) {
    return children;
  } else {
    return <Navigate to={route || "/login"} state={{ needRedirect: true }} />;
  }
}
