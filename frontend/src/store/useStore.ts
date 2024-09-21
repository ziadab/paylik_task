import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { User, Blog, AuthResponse, PaginationBlogs } from "../api/types";

export const useStore = defineStore("main", {
  state: () => ({
    blogs: [] as Blog[],
    user: null as User | null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async fetchBlogs(page = 1) {
      const response = await request.get<PaginationBlogs>(
        `/api/posts?page=${page}`
      );
      this.blogs = response.data.results;
    },
    async login(credentials: { email: string; password: string }) {
      const response = await request.post<AuthResponse>(
        "/api/login/",
        credentials
      );
      this.user = response.data.user;
      this.token = response.data.access_token;
      localStorage.setItem("token", this.token || "");
      request.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    },
    async register(user: {
      username: string;
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }) {
      await request.post("/api/register/", user);
    },
    async createPost(post: Blog) {
      await request.post("/api/posts/", post);
    },
    async editPost(id: number, post: Blog) {
      await request.put(`/api/posts/${id}/`, post);
    },
  },
});
