const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} = require("../services/product.service");

const {
  getUploadedFilePath,
  attachFileUrl,
  attachFileUrlsToList,
} = require("../utils/file");

const createProductController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const imagePath = getUploadedFilePath(req, "products", "");

    const payload = {
      ...req.body,
      image: imagePath,
    };

    const product = await createProduct(payload);

    return res.status(201).json({
      message: "Product created successfully",
      product: attachFileUrl(req, product.toJSON()),
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to create product",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const imagePath = getUploadedFilePath(req, "products", req.body.image || "");

    const payload = {
      ...req.body,
      image: imagePath,
    };

    const product = await updateProduct(req.params.id, payload);

    return res.status(200).json({
      message: "Product updated successfully",
      product: attachFileUrl(req, product.toJSON()),
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to update product",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to delete product",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json({
      message: "Products fetched successfully",
      products: attachFileUrlsToList(
        req,
        products.map((item) => item.toJSON())
      ),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch products",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    return res.status(200).json({
      message: "Product fetched successfully",
      product: attachFileUrl(req, product.toJSON()),
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message || "Failed to fetch product",
    });
  }
};

module.exports = {
  createProduct: createProductController,
  updateProduct: updateProductController,
  removeProduct,
  getProducts,
  getSingleProduct,
};