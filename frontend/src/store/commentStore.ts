import { defineStore } from "pinia";
import { commentRequet } from "@/utils/request";
import { Comments, GetComments } from "@/api/types";

export const userStore = defineStore("user", {
  state: () => ({
    comments: [] as Comments,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchComments(blogId: string, skip: number = 0, limit: number = 10) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await commentRequet.get<GetComments>(
          `comments/${blogId}`,
          {
            params: {
              skip,
              limit,
            },
          }
        );
        this.comments = data.comments;
      } catch (error: any) {
        this.error = "Error fetching comments. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    async createComment(blogId: string, content: string) {
      this.loading = true;
      this.error = null;
      try {
        await commentRequet.post(`comments/`, {
          blog_id: blogId,
          content,
        });

        this.fetchComments(blogId);
      } catch (error: any) {
        this.error = "Error fetching comments. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async deleteComment(blogId: string, commentId: string) {
      this.loading = true;
      this.error = null;
      try {
        await commentRequet.delete(`comments/${commentId}`);
        this.fetchComments(blogId);
      } catch (error: any) {
        this.error = "Error fetching comments. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
});
