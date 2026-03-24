import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "../../constants/routePaths";
import { ROLES } from "../../constants/role";

function AdminRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (!token || !user) {
    return <Navigate to={ROUTE_PATHS.AUTH.ADMIN_LOGIN} replace />;
  }

  if (user.role !== ROLES.ADMIN) {
    return <Navigate to={ROUTE_PATHS.PUBLIC.HOME} replace />;
  }

  return children;
}

export default AdminRoute;