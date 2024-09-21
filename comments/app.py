from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user, TokenData
import schemas
import models
import actions

app = FastAPI()


@app.post("/comments/", response_model=schemas.CommentOut)
def create_comment(
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):

    post = (
        db.query(models.BlogPost).filter(models.BlogPost.id == comment.post_id).first()
    )

    if not post:
        raise HTTPException(status_code=400, detail="Blog post does not exist")

    return actions.create_comment(db, comment, current_user.user_id)


@app.get("/comments/{post_id}", response_model=list[schemas.CommentOut])
def get_comments(
    post_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):
    print(current_user)
    return actions.get_comments_by_post(db, post_id, skip, limit)


@app.put("/comments/{comment_id}", response_model=schemas.CommentOut)
def update_comment(
    comment_id: int,
    comment: schemas.CommentUpdate,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):

    db_comment = actions.get_comment(db, comment_id)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if db_comment.user_id != current_user.user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this comment"
        )

    return actions.update_comment(db, comment_id, comment.content)


@app.delete("/comments/{comment_id}", response_model=schemas.CommentOut)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):

    db_comment = actions.get_comment(db, comment_id)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if db_comment.user_id != current_user.user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this comment"
        )

    return actions.delete_comment(db, comment_id)
