import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Box sx={{ py: 5 }}>
                  <Typography variant="body1" color="text.secondary">
                    No products found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.imageUrl || product.image || ""}
                    alt={product.name || "Product"}
                    sx={{ width: 56, height: 56, borderRadius: 2 }}
                  />
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹ {product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Chip
                    label={product.isActive ? "Active" : "Inactive"}
                    color={product.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(product.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(product.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;