import { Container, Paper, Typography } from "@mui/material";
import AdminLoginForm from "../../components/forms/AdminLoginForm";

function AdminLogin() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" mb={1} fontWeight={600}>
          Admin Login
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Login to admin panel
        </Typography>

        <AdminLoginForm />
      </Paper>
    </Container>
  );
}

export default AdminLogin;