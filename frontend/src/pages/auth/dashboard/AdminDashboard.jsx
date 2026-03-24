import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Container, Grid, Typography } from "@mui/material";
import DashboardHeader from "../../../components/forms/dashboard/dashboard";
import StatsCard from "../../../components/forms/dashboard/StatsCard";
import UserTable from "../../../components/forms/dashboard/UserTable";
import { logoutService } from "../../../services/authService";
import { getUsersService } from "../../../services/userService";
import { logout } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routePaths";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersService();
        setUsers(data.users || []);
      } catch (error) {
        setApiError(
          error?.response?.data?.message || "Failed to fetch users."
        );
      }
    };

    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalAdmins = users.filter((item) => item.role === "admin").length;
    const totalNormalUsers = users.filter((item) => item.role === "user").length;

    return [
      { title: "Total Users", value: totalUsers },
      { title: "Admins", value: totalAdmins },
      { title: "Normal Users", value: totalNormalUsers },
    ];
  }, [users]);

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      dispatch(logout());
      navigate(ROUTE_PATHS.AUTH.ADMIN_LOGIN);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DashboardHeader
        title="Admin Dashboard"
        subtitle={`Welcome ${user?.name || "Admin"}`}
        onLogout={handleLogout}
      />

      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {apiError}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <StatsCard title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Registered Users
      </Typography>

      <UserTable users={users} />
    </Container>
  );
}

export default AdminDashboard;