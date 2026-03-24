import UserDashboard from "../../pages/auth/dashboard/UserDashboard";
import AdminDashboard from "../../pages/auth/dashboard/AdminDashboard";
import ProductListPage from "../../pages/auth/dashboard/ProductListPage";
import AdminProductPage from "../../pages/auth/dashboard/AdminProductPage";
import ProtectedRoute from "../guards/ProtectedRoute";
import AdminRoute from "../guards/AdminRoute";
import { ROUTE_PATHS } from "../../constants/routePaths";

export const dashboardRoutes = [
  {
    path: ROUTE_PATHS.USER.DASHBOARD,
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_PATHS.USER.PRODUCTS,
    element: (
      <ProtectedRoute>
        <ProductListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN.DASHBOARD,
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN.PRODUCTS,
    element: (
      <AdminRoute>
        <AdminProductPage />
      </AdminRoute>
    ),
  },
];