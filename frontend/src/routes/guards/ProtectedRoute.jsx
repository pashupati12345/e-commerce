import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "../../constants/routePaths";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (!token || !user) {
    return <Navigate to={ROUTE_PATHS.AUTH.USER_LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;