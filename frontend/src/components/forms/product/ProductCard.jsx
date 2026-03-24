import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

function ProductCard({ product, onAddToCart }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.25s ease",
        bgcolor: "#fff",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          p: 2,
          bgcolor: "#f8fafc",
          borderBottom: "1px solid #eef2f7",
        }}
      >
        <CardMedia
          component="img"
          image={product.imageUrl || product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "contain",
          }}
        />

        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: 600,
              bgcolor: "#ffffff",
              border: "1px solid #e5e7eb",
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: 1.4,
            minHeight: 45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: "#111827",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            minHeight: 40,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description || "No description available"}
        </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography
            sx={{
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            ₹{product.price}
          </Typography>
        </Box>

        <Button
          fullWidth
          onClick={() => onAddToCart?.(product)}
          sx={{
            mt: "auto",
            borderRadius: "999px",
            py: 1.1,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.95rem",
            backgroundColor: "#ffd814",
            color: "#111827",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#f7ca00",
              boxShadow: "none",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;