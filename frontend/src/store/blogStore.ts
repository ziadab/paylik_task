import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { Blog, PaginationBlogs } from "@/api/types";

export const blogStore = defineStore("blog", {
  state: () => ({
    blogs: [] as Blog[],
    count: 0,
    title: "",
    next: null as string | null,
    previous: null as string | null,
    currentPage: 1,
    itemsPerPage: 10,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchBlogs() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await request.get<PaginationBlogs>(`blogs/`, {
          params: {
            page: this.currentPage,
            title: this.title,
            items: this.itemsPerPage,
            page_size: this.itemsPerPage,
          },
        });
        this.blogs = data.results;
        this.count = data.count;
        this.next = data.next;
        this.previous = data.previous;
      } catch (error: any) {
        this.error = "Error fetching blogs. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
});
