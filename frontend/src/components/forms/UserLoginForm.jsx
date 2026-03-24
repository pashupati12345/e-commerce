import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { userLoginSchema } from "../../validations/authValidation";
import { userLoginService } from "../../services/authService";
import { ROUTE_PATHS } from "../../constants/routePaths";
import { setLoginData } from "../../features/auth/authSlice";

function UserLoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    setApiError("");

    try {
      const data = await userLoginService(formData);

      dispatch(
        setLoginData({
          user: data.user,
          token: data.token,
        })
      );

      if (data.user.role === "user") {
        navigate(ROUTE_PATHS.USER.DASHBOARD);
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.message || "Login failed. Please try again."
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

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 3, py: 1.4, borderRadius: 2 }}
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link component={RouterLink} to={ROUTE_PATHS.AUTH.USER_SIGNUP}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default UserLoginForm;