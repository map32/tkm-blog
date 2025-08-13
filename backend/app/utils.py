from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
ALGO = "HS256"

def hash_password(p: str):
    return pwd.hash(p)

def verify_password(p: str, h: str):
    return pwd.verify(p, h)

def create_token(sub: str, minutes: int = 60*24):
    payload = {"sub": sub, "exp": datetime.utcnow() + timedelta(minutes=minutes)}
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGO)

def decode_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=[ALGO])