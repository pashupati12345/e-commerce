import { useEffect, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function ProductForm({ initialValues, onSubmit, isSubmitting, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    isActive: true,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        category: initialValues.category || "",
        description: initialValues.description || "",
        price: initialValues.price || "",
        stock: initialValues.stock || "",
        isActive:
          initialValues.isActive !== undefined ? initialValues.isActive : true,
      });

      setPreview(initialValues.imageUrl || initialValues.image || "");
      setSelectedFile(null);
    } else {
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        isActive: true,
      });
      setPreview("");
      setSelectedFile(null);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("isActive", formData.isActive);

    if (selectedFile) {
      payload.append("image", selectedFile);
    } else if (initialValues?.image) {
      payload.append("image", initialValues.image);
    }

    onSubmit(payload);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(90vh - 88px)",
      }}
    >
      <DialogContent
        dividers
        sx={{
          px: 3,
          py: 3,
          bgcolor: "#ffffff",
          overflowY: "auto",
        }}
      >
        <Stack spacing={2.2}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "#fff",
              },
            }}
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "#fff",
              },
            }}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "#fff",
              },
            }}
          />

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "#fff",
              },
            }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write short product description"
            multiline
            minRows={4}
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "#fff",
                alignItems: "flex-start",
              },
            }}
          />

          <Box
            sx={{
              border: "1.5px dashed #cbd5e1",
              borderRadius: 3,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              bgcolor: "#f8fafc",
            }}
          >
            <CloudUploadOutlinedIcon
              sx={{ fontSize: 36, color: "#1976d2", mb: 1 }}
            />

            <Typography fontWeight={700} sx={{ mb: 0.5 }}>
              Upload Product Image
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              PNG, JPG, JPEG supported
            </Typography>

            <Button
              component="label"
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                fontWeight: 600,
              }}
            >
              Choose File
              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </Button>
          </Box>

          {preview && (
            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                p: 2,
                bgcolor: "#f8fafc",
              }}
            >
              <Typography fontWeight={600} sx={{ mb: 1.5 }}>
                Image Preview
              </Typography>

              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #dbe3ea",
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              p: 2.5,
              bgcolor: "#f8fafc",
            }}
          >
            <Typography fontWeight={700}>Product Status</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Control whether this product is visible and active.
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label={formData.isActive ? "Active Product" : "Inactive Product"}
              sx={{ m: 0 }}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #e5e7eb",
          bgcolor: "#f8fafc",
          justifyContent: "flex-end",
          gap: 1.5,
          flexShrink: 0,
          position: "sticky",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
          }}
        >
          {isSubmitting
            ? "Saving..."
            : initialValues?.id
            ? "Update Product"
            : "Submit Product"}
        </Button>
      </DialogActions>
    </Box>
  );
}

export default ProductForm;