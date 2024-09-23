from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    first_name: str
    last_name: str
    username: str


class CommentBase(BaseModel):
    content: str
    blog_id: int


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    content: str


class CommentOut(CommentBase):
    id: int
    user: User
    created_at: datetime


class Pagination(BaseModel):
    current_page: int
    page_size: int
    total_comments: int
    total_pages: int
    has_next: bool


class CommentsOut(BaseModel):
    comments: list[CommentOut]
    pagination: Pagination
