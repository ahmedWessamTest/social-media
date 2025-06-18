import axios from "axios";
import { env } from "../environment/environment";

const api = axios.create({
  baseURL: env.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid");
      // localStorage.removeItem("userToken");
      // window.location.href = "/signin";
    } else if (error.response?.status === 403) {
      console.error("Forbidden: ", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
