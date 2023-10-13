import useAuth from "../../context/auth";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children, route }) {
  const { authed } = useAuth();

  if (authed) {
    return children;
  } else {
    return <Navigate to={route || "/login"} state={{ needRedirect: true }} />;
  }
}
