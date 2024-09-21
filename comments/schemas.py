from pydantic import BaseModel
from datetime import datetime


class CommentBase(BaseModel):
    content: str
    post_id: int


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    content: str


class CommentOut(CommentBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
