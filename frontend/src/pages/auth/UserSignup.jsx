import { Container, Paper, Typography } from "@mui/material";
import UserSignupForm from "../../components/forms/UserSignupForm";

function UserSignup() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" mb={1} fontWeight={600}>
          User Signup
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Create your account
        </Typography>

        <UserSignupForm />
      </Paper>
    </Container>
  );
}

export default UserSignup;