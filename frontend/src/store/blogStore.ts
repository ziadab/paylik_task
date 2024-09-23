import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { Blog } from "@/api/types";
import router from "@/router";

export const blogStore = defineStore("blog", {
  state: () => ({
    blog: null as Blog | null,
    error: null as string | null,
    loading: false,
  }),
  actions: {
    async reset() {
      this.blog = null;
      this.error = null;
      this.loading = false;
    },
    async createBlog(blog: { title: string; content: string }) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await request.post<Blog>("blogs/", blog);
        router.push(`/blogs/${data.id}`);
      } catch (error: any) {
        this.error = "Error creating blog. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async getBlog(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await request.get<Blog>(`blogs/${id}/`);
        this.blog = data;
      } catch (error: any) {
        this.error =
          error.response?.data.message ||
          "Error fetching blog. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async updateBlog(blog: { id: string; title: string; content: string }) {
      this.loading = true;
      this.error = null;
      try {
        await request.put<Blog>(`blogs/${blog.id}/`, blog);
        router.push(`/blog/${blog.id}`);
      } catch (error: any) {
        this.error = "Error updating blog. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async deleteBlog(id: string) {
      this.loading = true;
      this.error = null;
      try {
        await request.delete(`blogs/${id}/`);
        router.push("/");
      } catch (error: any) {
        this.error = "Error deleting blog. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
});
