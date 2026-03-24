import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Paper, Typography } from "@mui/material";
import DashboardHeader from "../../../components/forms/dashboard/dashboard";
import StatsCard from "../../../components/forms/dashboard/StatsCard";
import { logoutService } from "../../../services/authService";
import { logout } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routePaths";

function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const stats = useMemo(
    () => [
      { title: "User Role", value: user?.role || "N/A" },
      { title: "Token Available", value: token ? "Yes" : "No" },
      { title: "User Name", value: user?.name || "N/A" },
    ],
    [user, token]
  );

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      dispatch(logout());
      navigate(ROUTE_PATHS.AUTH.USER_LOGIN);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DashboardHeader
        title="User Dashboard"
        subtitle="Welcome to your dashboard. Here you can view your account summary."
        onLogout={handleLogout}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <StatsCard title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          User Information
        </Typography>
        <Typography>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Role: {user?.role}</Typography>
      </Paper>
    </Container>
  );
}

export default UserDashboard;