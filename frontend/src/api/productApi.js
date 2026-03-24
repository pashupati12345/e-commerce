import api from "./axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const createProductApi = (payload) =>
  api.post(API_ENDPOINTS.PRODUCT.BASE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProductApi = (id, payload) =>
  api.put(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getProductsApi = () => api.get(API_ENDPOINTS.PRODUCT.BASE);

export const getProductByIdApi = (id) =>
  api.get(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`);

export const deleteProductApi = (id) =>
  api.delete(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`);