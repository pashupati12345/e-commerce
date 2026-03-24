import { getUsersApi } from "../api/userApi";

export const getUsersService = async () => {
  const response = await getUsersApi();
  return response.data;
};