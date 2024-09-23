export interface PaginationBlogs {
  count: number;
  next: any;
  previous: any;
  results: Blog[];
}

export interface User {
  username: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh: string;
  message: string;
  user: User;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export type Comments = Comment[];

export interface Comment {
  content: string;
  blog_id: number;
  id: number;
  user: User;
  created_at: string;
}

export interface PaginationCommments {
  current_page: number;
  page_size: number;
  total_comments: number;
  total_pages: number;
  has_next: boolean;
}

export interface GetComments {
  comments: Comment[];
  pagination: PaginationCommments;
}
