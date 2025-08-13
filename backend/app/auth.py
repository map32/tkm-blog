from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import select
from .models import User
from .database import get_session
from .utils import hash_password, verify_password, create_token, decode_token
from sqlmodel import Session
import os

router = APIRouter(prefix="/api/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.post("/register")
def register(username: str, password: str, session: Session = Depends(get_session)):
    if session.exec(select(User).where(User.username == username)).first():
        raise HTTPException(400, "Username already exists")
    user = User(username=username, password_hash=hash_password(password))
    session.add(user)
    session.commit()
    return {"ok": True}

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == form.username)).first()
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_token(user.username)
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    try:
        payload = decode_token(token)
        username = payload.get("sub")
    except Exception:
        raise HTTPException(401, "Invalid token")
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        raise HTTPException(401, "User not found")
    return user

# optional: bootstrap admin account from env on first call
@router.get("/bootstrap")
def bootstrap(session: Session = Depends(get_session)):
    u = os.getenv("ADMIN_USER")
    p = os.getenv("ADMIN_PASS")
    if u and p and not session.exec(select(User).where(User.username==u)).first():
        session.add(User(username=u, password_hash=hash_password(p)))
        session.commit()
        return {"created": True}
    return {"created": False}