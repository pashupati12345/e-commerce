import { useRoutes, Navigate } from "react-router-dom";
import { authRoutes } from "./routeConfig/authRoutes";
import { dashboardRoutes } from "./routeConfig/dashboardRoutes";
import { ROUTE_PATHS } from "../constants/routePaths";
import NotFoundPage from "../pages/common/NotFoundPage";


function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={ROUTE_PATHS.AUTH.USER_LOGIN} replace />,
    },
    ...authRoutes,
    ...dashboardRoutes,
     {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return routes;
}

export default AppRoutes;