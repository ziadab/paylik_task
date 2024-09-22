import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

request.interceptors.request.use(
  async function (config) {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { request };
