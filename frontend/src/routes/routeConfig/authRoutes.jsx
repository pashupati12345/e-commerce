import UserSignup from "../../pages/auth/UserSignup";
import UserLogin from "../../pages/auth/UserLogin";
import AdminLogin from "../../pages/auth/AdminLogin";
import { ROUTE_PATHS } from "../../constants/routePaths";

export const authRoutes = [
  {
    path: ROUTE_PATHS.AUTH.USER_SIGNUP,
    element: <UserSignup />,
  },
  {
    path: ROUTE_PATHS.AUTH.USER_LOGIN,
    element: <UserLogin />,
  },
  {
    path: ROUTE_PATHS.AUTH.ADMIN_LOGIN,
    element: <AdminLogin />,
  },
];