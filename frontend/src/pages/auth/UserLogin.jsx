import { Container, Paper, Typography } from "@mui/material";
import UserLoginForm from "../../components/forms/UserLoginForm";

function UserLogin() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" mb={1} fontWeight={600}>
          User Login
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Login to your account
        </Typography>

        <UserLoginForm />
      </Paper>
    </Container>
  );
}

export default UserLogin;