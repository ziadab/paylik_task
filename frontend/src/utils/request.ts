import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.API_URL,
});

request.interceptors.request.use(
  async function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { request };
