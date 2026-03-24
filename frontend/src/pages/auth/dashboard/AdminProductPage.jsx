import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "../../../components/forms/product/productForm";
import ProductTable from "../../../components/forms/product/ProductTable";
import {
  createProductService,
  updateProductService,
  getProductsService,
  getProductByIdService,
  deleteProductService,
} from "../../../services/productService";

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProductsService();
      setProducts(data?.products || []);
    } catch (error) {
      setApiError(error?.response?.data?.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setApiError("");
    setSuccessMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleCreateOrUpdate = async (payload) => {
    try {
      setApiError("");
      setSuccessMessage("");
      setIsSubmitting(true);

      if (editingProduct?.id) {
        await updateProductService(editingProduct.id, payload);
        setSuccessMessage("Product updated successfully");
      } else {
        await createProductService(payload);
        setSuccessMessage("Product created successfully");
      }

      await fetchProducts();
      handleCloseModal();
    } catch (error) {
      setApiError(error?.response?.data?.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      const data = await getProductByIdService(id);
      setEditingProduct(data?.product || null);
      setApiError("");
      setSuccessMessage("");
      setOpenModal(true);
    } catch (error) {
      setApiError(error?.response?.data?.message || "Failed to fetch product");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProductService(id);
      setSuccessMessage("Product deleted successfully");
      await fetchProducts();
    } catch (error) {
      setApiError(error?.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Product Management
          </Typography>
          <Typography color="text.secondary">
            Manage all products from one place.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Product
        </Button>
      </Stack>

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

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

     <Dialog
  open={openModal}
  onClose={handleCloseModal}
  fullWidth
  maxWidth="sm"
  scroll="paper"
  PaperProps={{
    sx: {
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(15, 23, 42, 0.18)",
      maxHeight: "90vh",
    },
  }}
>
  <DialogTitle
    sx={{
      px: 3,
      py: 2.2,
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "#f8fafc",
      flexShrink: 0,
    }}
  >
    <Box>
      <Typography variant="h6" fontWeight={700}>
        {editingProduct?.id ? "Edit Product" : "Add Product"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Fill in the product details below.
      </Typography>
    </Box>

    <IconButton onClick={handleCloseModal}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <ProductForm
    initialValues={editingProduct}
    onSubmit={handleCreateOrUpdate}
    isSubmitting={isSubmitting}
    onCancel={handleCloseModal}
  />
</Dialog>
    </Container>
  );
}

export default AdminProductPage;