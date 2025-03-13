from pydantic import BaseModel
from fastapi.security import  HTTPAuthorizationCredentials, HTTPBearer
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from sqlmodel import Session
from API.database import engine
from fastapi import APIRouter, Header, HTTPException, Depends,status
import jwt
from datetime import datetime, timedelta, timezone


router_user = APIRouter()

load_dotenv('.env')


SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM")



bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto") # helps hash passwords

def get_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)

def get_session():
    with Session(engine) as session:
        yield session  # Yield the session for use in endpoints


security_scheme = HTTPBearer()

class Token(BaseModel):
    access_token: str
    token_type: str



async def jwt_decode_token(credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    if credentials.scheme != "Bearer":
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM], issuer=None,
                             leeway=0, options={"verify_aud": False, "verify_signature": True})
        return payload
    except jwt.exceptions.DecodeError as error:
        raise HTTPException(status_code=401, detail=error.__str__())
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")

def create_access_token(email:str, user_id:int, expires_delta: timedelta, is_admin: bool):
    encode = {'sub': email, 'id': user_id, 'is_admin': is_admin}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)




def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    if credentials.scheme != "Bearer":
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM], issuer=None,
                             leeway=0, options={"verify_aud": False, "verify_signature": True})
        email: str = payload.get('sub')
        user_id: int =  payload.get('id')
        is_admin: bool = payload.get('is_admin')
        return {'email': email, 'id': user_id, 'is_admin': is_admin}
    except jwt.exceptions.DecodeError as error:
        raise HTTPException(status_code=401, detail=error.__str__())
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
