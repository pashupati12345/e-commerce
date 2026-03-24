import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "../../constants/routePaths";
import { ROLES } from "../../constants/role";


function PublicRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (token && user) {
    if (user.role === ROLES.ADMIN) {
      return <Navigate to={ROUTE_PATHS.ADMIN.DASHBOARD} replace />;
    }

    return <Navigate to={ROUTE_PATHS.USER.DASHBOARD} replace />;
  }

  return children;
}

export default PublicRoute;