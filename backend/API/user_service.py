from fastapi.security import HTTPAuthorizationCredentials
from .auth import bcrypt_context,SECRET_KEY,ALGORITHM,security_scheme
from typing import Annotated
from datetime import datetime, timedelta, timezone
from fastapi import status,Depends,HTTPException
from sqlmodel import select
import jwt
from hugging_face_func import capture_images_and_encode
import numpy as np
import pickle
from .models import User, UserEncoding
from fastapi.responses import JSONResponse
from face_rec import capture_and_authenticate_user
from API.auth import create_access_token
from .models import UserChallenge,Challenge





def register_user(user_data, session):
    # Check if user exists
    existing = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email or username already exists.")

    # Create new user (without capturing face yet)
    user = User(
        email=user_data.email,
        hashed_password=bcrypt_context.hash(user_data.password)
    )
    session.add(user)
    session.commit()
    session.refresh(user)  # Get user ID

    return JSONResponse(content={"message": "✅ Signup successful!", "user_id": user.id}, status_code=201)

def capture_face(user_id,session):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    try:
        encoding_binary = capture_images_and_encode()  # Capture face embeddings
        
        # Store encoding in database
        user_encoding = UserEncoding(user_id=user.id, encoding=encoding_binary)
        session.add(user_encoding)
        session.commit()

        return JSONResponse(content={"message": "✅ Face encoding stored successfully!"}, status_code=201)

    except HTTPException as e:
        return JSONResponse(content={"success": False, "detail": str(e)}, status_code=500)


def authenticate_user(email:str, password:str, db):
    statement = select(User).where(User.email == email)
    user = db.exec(statement).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user


def manual_login(session,dto):
    user = authenticate_user(dto.email, dto.password, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
    token = create_access_token(user.email, user.id, timedelta(minutes=60),user.is_admin)
    return {'access_token': token, 'token_type': 'bearer'}


def login_with_face(session):
    email = capture_and_authenticate_user(session)
    
    print(f"🔍 Searching for user in DB: {email}")  # Debug print

    # Retrieve user ID from DB
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user:
        print("❌ User not found in database!")  # Debug print
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    print(f"✅ User {user.email} found. Generating token...")  # Debug print
    
    token = create_access_token(user.email, user.id, timedelta(minutes=60), user.is_admin)

    return {'access_token': token, 'token_type': 'bearer'}

    

