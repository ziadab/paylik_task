import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

request.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { request };
