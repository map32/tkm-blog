from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
ALGO = "HS256"

# 1. Create a CryptContext object, specifying argon2 as the scheme.
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str) -> str:
    """
    Hashes a password directly using Argon2.
    No pre-hashing is needed.

    Args:
        password: The plain-text password to hash.

    Returns:
        The Argon2 hash string for database storage.
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain-text password against a stored Argon2 hash.

    Args:
        plain_password: The plain-text password from the user.
        hashed_password: The stored hash from the database.

    Returns:
        True if the password is correct, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)

def create_token(sub: str, minutes: int = 60*24):
    payload = {"sub": sub, "exp": datetime.utcnow() + timedelta(minutes=minutes)}
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGO)

def decode_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=[ALGO])