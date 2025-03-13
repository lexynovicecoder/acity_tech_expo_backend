from fastapi.security import HTTPAuthorizationCredentials
from API.models import Admin
from API.auth import bcrypt_context,SECRET_KEY,ALGORITHM,security_scheme
from typing import Annotated
from datetime import datetime, timedelta, timezone
from fastapi import status,Depends,HTTPException
from sqlmodel import select
from fastapi.responses import JSONResponse
import jwt
from API.auth import create_access_token
from API.models import Challenge, UserChallenge

def authenticate_admin(email:str, password:str, db):
    statement = select(Admin).where(Admin.email == email)
    admin = db.exec(statement).first()
    if not admin:
        return False
    if not bcrypt_context.verify(password, admin.hashed_password):
        return False
    return admin

def create_challenges(dto,session,payload):
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication Failed")

    is_admin = payload.get('is_admin', False)  # Default to False if key is missing

    if not is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an Admin")

    challenge = Challenge(name=dto.name)
    session.add(challenge)
    session.commit()
    session.refresh(challenge)
    return JSONResponse(content={"message": "Challenge created successfully"}, status_code=201)

def login_for_token(dto,session):
    admin = authenticate_admin(dto.email, dto.password, session)
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
    token = create_access_token(admin.email, admin.id, timedelta(minutes=60), admin.is_admin)
    return {'access_token': token, 'token_type': 'bearer'}

def edit_challenge(dto,session,payload,id):
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication Failed")

    is_admin = payload.get('is_admin', False)  # Default to False if key is missing

    if not is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an Admin")
    challenge_item = session.get(Challenge, id)
    if not challenge_item:
        raise HTTPException(status_code=404, detail="Challenge Not Found!")
        
    challenge_data = dto.model_dump(exclude_unset=False)
    for key, value in challenge_data.items():
        setattr(challenge_item, key, value)
    session.add(challenge_item)
    session.commit()
    session.refresh(challenge_item)
    return challenge_item

def delete_challenge(session,payload,id,response):
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication Failed")

    is_admin = payload.get('is_admin', False)  # Default to False if key is missing

    if not is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an Admin")
    challenge_item = session.get(Challenge, id)
    if not challenge_item:
        raise HTTPException(status_code=404, detail="Challenge Not Found!")


    session.delete(challenge_item)
    session.commit()
    status_code = status.HTTP_204_NO_CONTENT
    response.status_code = status.HTTP_204_NO_CONTENT
    return response.status_code