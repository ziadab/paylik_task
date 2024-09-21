from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    first_name: str
    last_name: str
    username: str


class CommentBase(BaseModel):
    content: str
    post_id: int


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    content: str


class CommentOut(CommentBase):
    id: int
    user: User
    created_at: datetime
