const { Product } = require("../model");

const createProduct = async (payload) => {
  const { name, description, price, image, stock, category, isActive } = payload;

  return await Product.create({
    name,
    description,
    price,
    image,
    stock,
    category,
    isActive,
  });
};

const updateProduct = async (id, payload) => {
  const { name, description, price, image, stock, category, isActive } = payload;

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.update({
    name,
    description,
    price,
    image,
    stock,
    category,
    isActive,
  });

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();
  return true;
};

const getAllProducts = async () => {
  return await Product.findAll({
    order: [["createdAt", "DESC"]],
  });
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};