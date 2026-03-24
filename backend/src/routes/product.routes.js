const express = require("express");
const {
  createProduct,
  updateProduct,
  removeProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const { uploadProductImage } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/product.validation");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("user", "admin"),
  getProducts
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getSingleProduct
);

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  uploadProductImage.single("image"),
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  uploadProductImage.single("image"),
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  removeProduct
);

module.exports = router;