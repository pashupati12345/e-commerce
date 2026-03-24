import { useEffect, useState } from "react";
import { Alert, Container, Grid, Typography } from "@mui/material";
import ProductCard from "../../../components/forms/product/ProductCard";
import { getProductsService } from "../../../services/productService";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsService();
        setProducts(data?.products || []);
      } catch (error) {
        setApiError(error?.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 3, color: "#111827" }}
      >
        All Products
      </Typography>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default ProductListPage;