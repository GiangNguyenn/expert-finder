from datetime import datetime, timedelta
import os
import uuid
from fastapi import FastAPI, HTTPException, APIRouter
from typing import Union, Any
from app.db import con, cur
from app.models.auth import LoginRequest, SignUpRequest
import jwt

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = os.getenv("JWT_SECRET")


# query user by email
# return user if found
def query_user_by_email(email: str):
    try:
        cur.execute(f"SELECT * FROM users WHERE email='{email}'")
        user = cur.fetchone()
        return user
    except Exception as e:
        print(e)
        return None

def verify_password(username, password):
    user = query_user_by_email(username)
    return user if user[2] == password else None

def generate_token(data: dict) -> str:
    expire = datetime.utcnow() + timedelta(
        seconds=60 * 60 * 24 * 3  # Expired after 3 days
    )
    to_encode = {
        "exp": expire, "data": data
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
    return encoded_jwt


@router.post("/login")
async def login(request: LoginRequest):
    email, password = request.email, request.password
    user = verify_password(email, password)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    token = generate_token({"id": user[0], "email": user[1], "name": user[3]})
    return {"token": token}

# Sign up
@router.post("/signup")
async def signup(request: SignUpRequest):
    email, password, name = request.email, request.password, request.name
    # generate uuid
    id = uuid.uuid4()
    try:
        cur.execute(f"INSERT INTO users (id, email, password, name) VALUES ('{id}', '{email}', '{password}', '{name}')")
        con.commit()
        return {"message": "Sign up successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Sign up failed due to internal server error!")