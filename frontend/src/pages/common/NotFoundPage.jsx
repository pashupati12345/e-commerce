import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#f8fafc",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 5,
            px: { xs: 3, sm: 6 },
            py: { xs: 6, sm: 8 },
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Box
            sx={{
              width: 84,
              height: 84,
              mx: "auto",
              mb: 3,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#eff6ff",
              color: "#2563eb",
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ fontSize: 42 }} />
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "4rem", sm: "6rem" },
              lineHeight: 1,
              fontWeight: 800,
              color: "#0f172a",
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#111827",
              mb: 1.5,
              fontSize: { xs: "1.8rem", sm: "2.2rem" },
            }}
          >
            Page not found
          </Typography>

          <Typography
            sx={{
              maxWidth: 520,
              mx: "auto",
              color: "#6b7280",
              fontSize: "1rem",
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Sorry, the page you are looking for does not exist, was moved,
            or the URL may be incorrect.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                borderRadius: 3,
                px: 3.5,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
              }}
            >
              Go to Home
            </Button>

            <Button
              variant="outlined"
              startIcon={<ShoppingBagRoundedIcon />}
              onClick={() => navigate("/products")}
              sx={{
                borderRadius: 3,
                px: 3.5,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Browse Products
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFoundPage;