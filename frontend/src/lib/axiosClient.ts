import axios from "axios";
import { getLocalStorage } from "../helper/helper";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers["X-Software-ID"] = "PXL0001";
    config.headers["X-Request-ID"] = "abc";
    config.headers["X-API-Version"] = "1.2.3";
    config.headers["X-Client-Version"] = "2.14.0";
    config.headers["Accept"] = "application/json";
    config.headers["Accept-Language"] = "en-US";

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    const token = getLocalStorage("token") || null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
