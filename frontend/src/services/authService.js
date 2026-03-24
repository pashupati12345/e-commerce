import {
  userSignupApi,
  userLoginApi,
  adminLoginApi,
} from "../api/authApi";

export const userSignupService = async (payload) => {
  const response = await userSignupApi(payload);
  return response.data;
};

export const userLoginService = async (payload) => {
  const response = await userLoginApi(payload);
  return response.data;
};

export const adminLoginService = async (payload) => {
  const response = await adminLoginApi(payload);
  return response.data;
};


export const logoutService = async () => {
  const response = await logoutApi();
  return response.data;
};