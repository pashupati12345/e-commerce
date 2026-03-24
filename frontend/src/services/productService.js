import {
  createProductApi,
  updateProductApi,
  getProductsApi,
  getProductByIdApi,
  deleteProductApi,
} from "../api/productApi";

export const createProductService = async (payload) => {
  const response = await createProductApi(payload);
  return response.data;
};

export const updateProductService = async (id, payload) => {
  const response = await updateProductApi(id, payload);
  return response.data;
};

export const getProductsService = async () => {
  const response = await getProductsApi();
  return response.data;
};

export const getProductByIdService = async (id) => {
  const response = await getProductByIdApi(id);
  return response.data;
};

export const deleteProductService = async (id) => {
  const response = await deleteProductApi(id);
  return response.data;
};