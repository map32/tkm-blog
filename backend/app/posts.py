from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from .models import *
from .database import get_session
from .auth import get_current_user
from datetime import datetime
from typing import List

router = APIRouter(prefix="/api/posts", tags=["posts"])

@router.get("")
def list_posts(session: Session = Depends(get_session)) -> List[PostRead]:
    posts = session.exec(select(Post).order_by(Post.created_at.desc())).all()
    return posts

@router.post("")
def create_post(data: Post, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    data.author_id = user.id
    now = datetime.utcnow()
    data.created_at = now
    data.updated_at = now
    session.add(data)
    session.commit()
    session.refresh(data)
    return data

@router.get("/{pid}")
def get_post(pid: int, session: Session = Depends(get_session)):
    post = session.get(Post, pid)
    if not post:
        raise HTTPException(404, "Not found")
    return post

@router.put("/{pid}")
def update_post(pid: int, data: Post, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    post = session.get(Post, pid)
    if not post:
        raise HTTPException(404, "Not found")
    if post.author_id != user.id:
        raise HTTPException(403, "Not your post")
    post.title = data.title
    post.body_markdown = data.body_markdown
    post.updated_at = datetime.utcnow()
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.delete("/{pid}")
def delete_post(pid: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    post = session.get(Post, pid)
    if not post:
        raise HTTPException(404, "Not found")
    if post.author_id != user.id:
        raise HTTPException(403, "Not your post")
    session.delete(post)
    session.commit()
    return {"ok": True}