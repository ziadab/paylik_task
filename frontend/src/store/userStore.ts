import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { User, AuthResponse } from "@/api/types";
import Cookies from "js-cookie";
import router from "@/router";

export const userStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await request.post<AuthResponse>("login/", {
          email,
          password,
        });

        this.user = response.data.user;
        this.token = response.data.access_token;
        Cookies.set("token", this.token, { expires: 1 });
        router.push("/");
      } catch (error: any) {
        this.error = error.response?.data.message || "Failed to login";
        this.loading = false;
      }
    },
    async register(user: {
      username: string;
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await request.post<AuthResponse>("register/", user);
        this.user = data.user;
        this.token = data.access_token;
        Cookies.set("token", this.token, { expires: 1 });
        router.push("/");
      } catch (error: any) {
        this.error = error.response?.data || "Failed to register";
        this.loading = false;
      }
    },
  },
});
