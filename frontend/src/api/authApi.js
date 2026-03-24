import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { postRequest } from "./apiClient";

export const userSignupApi = (payload) =>
  postRequest(API_ENDPOINTS.AUTH.USER_SIGNUP, payload);

export const userLoginApi = (payload) =>
  postRequest(API_ENDPOINTS.AUTH.USER_LOGIN, payload);

export const adminLoginApi = (payload) =>
  postRequest(API_ENDPOINTS.AUTH.ADMIN_LOGIN, payload);


export const logoutApi = () => api.post("/auth/logout");