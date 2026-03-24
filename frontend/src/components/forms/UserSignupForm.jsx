import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { userSignupSchema } from "../../validations/authValidation";
import { userSignupService } from "../../services/authService";
import { ROUTE_PATHS } from "../../constants/routePaths";

function UserSignupForm() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    setApiError("");
    setSuccessMessage("");

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      await userSignupService(payload);
      setSuccessMessage("Registration successful");
      reset();

      setTimeout(() => {
        navigate(ROUTE_PATHS.AUTH.USER_LOGIN);
      }, 1000);
    } catch (error) {
      setApiError(
        error?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          type="email"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 3, py: 1.4, borderRadius: 2 }}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link component={RouterLink} to={ROUTE_PATHS.AUTH.USER_LOGIN}>
            Login
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default UserSignupForm;