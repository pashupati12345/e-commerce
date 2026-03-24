import api from "./axios";

export const postRequest = (url, payload, config = {}) =>
  api.post(url, payload, config);

export const getRequest = (url, config = {}) => api.get(url, config);

export const putRequest = (url, payload, config = {}) =>
  api.put(url, payload, config);

export const deleteRequest = (url, config = {}) => api.delete(url, config);