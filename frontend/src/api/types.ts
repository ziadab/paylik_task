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
