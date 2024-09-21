import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { User, Blog, AuthResponse, PaginationBlogs } from "@/api/types";
import router from "@/router";

export const useStore = defineStore("main", {
  state: () => ({
    blogs: [] as Blog[],
    user: null as User | null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async fetchBlogs(page = 1) {
      const response = await request.get<PaginationBlogs>(
        `/blogs?page=${page}`
      );
      this.blogs = response.data.results;
    },
    async login(email: string, password: string) {
      const response = await request.post<AuthResponse>("login/", {
        email,
        password,
      });
      this.user = response.data.user;
      this.token = response.data.access_token;
      localStorage.setItem("token", this.token || "");
      router.push("/");
    },
    async register(user: {
      username: string;
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }) {
      await request.post("register/", user);
    },
    async createPost(post: Blog) {
      await request.post("blogs/", post);
    },
    async editPost(id: number, post: Blog) {
      await request.put(`blogs/${id}/`, post);
    },
  },
});
