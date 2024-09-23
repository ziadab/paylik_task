import { defineStore } from "pinia";
import { commentRequet } from "@/utils/request";
import { Comments, GetComments, PaginationCommments } from "@/api/types";

export const commentStore = defineStore("comments", {
  state: () => ({
    comments: [] as Comments,
    pagination: null as PaginationCommments | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchComments(
      blogId: string,
      page: number = 1,
      page_size: number = 10
    ) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await commentRequet.get<GetComments>(
          `comments/${blogId}`,
          {
            params: {
              page,
              page_size,
            },
          }
        );
        this.comments = data.comments;
        this.pagination = data.pagination;
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
        this.error = "Error creating your comments. Please try again later.";
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
        this.error = "Error deleting your comment. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    async fetchNextPage(blogId: string) {
      if (this.pagination?.has_next) {
        this.loading = true;
        this.error = null;
        try {
          const { data } = await commentRequet.get<GetComments>(
            `comments/${blogId}`,
            {
              params: {
                page: this.pagination.current_page + 1,
                page_size: this.pagination.page_size,
              },
            }
          );
          this.comments = [...this.comments, ...data.comments];
          this.pagination = data.pagination;
        } catch (error: any) {
          this.error = "Error fetching comments. Please try again later.";
        } finally {
          this.loading = false;
        }
      }
    },
    async updateComment(blogId: string, commentId: string, content: string) {
      this.loading = true;
      this.error = null;
      try {
        await commentRequet.put(`comments/${commentId}`, { content });
        this.fetchComments(blogId);
      } catch (error: any) {
        this.error = "Error updating the comment. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async clearComments() {
      this.comments = [];
      this.loading = false;
      this.error = null;
    },
  },
});
