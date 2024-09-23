from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from models import Comment
import redis
import os
import pickle

r = redis.Redis.from_url(os.getenv("REDIS_URL"))


def get_comment(db: Session, comment_id: int):
    if r.exists(f"comment:{comment_id}"):
        return pickle.loads(r.get(f"comment_{comment_id}"))
    else:
        comment = db.query(Comment).filter(Comment.id == comment_id).first()
        r.set(f"comment_{comment_id}", pickle.dumps(comment), ex=60*60*24)
        return comment


def get_comments_by_post(db: Session, blog_id: int, page: int = 0, page_size: int = 10):
    offset = (page - 1) * page_size

    total_comments = db.query(Comment).filter(Comment.blog_id == blog_id).count()
    comments = (
        db.query(Comment)
        .filter(Comment.blog_id == blog_id)
        .options(joinedload(Comment.user))
        .order_by(desc(Comment.created_at))
        .offset(offset)
        .limit(page_size)
        .all()
    )

    total_pages = (total_comments + page_size - 1) // page_size
    has_next = page < total_pages

    return {
        "comments": comments,
        "pagination": {
            "current_page": page,
            "page_size": page_size,
            "total_comments": total_comments,
            "total_pages": total_pages,
            "has_next": has_next,
        },
    }


def create_comment(db: Session, comment: Comment, user_id: int):
    db_comment = Comment(
        content=comment.content, blog_id=comment.blog_id, user_id=user_id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


def update_comment(db: Session, comment_id: int, new_content: str):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db_comment.content = new_content
        db.commit()
        db.refresh(db_comment)
        r.set(f"comment_{comment_id}", pickle.dumps(db_comment), ex=60*60*24)
    return db_comment


def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db.delete(db_comment)
        db.commit()
        r.delete(f"comment_{comment_id}")
    return db_comment
