from typing import Annotated
from sqlmodel import Session
from API.database import engine
from fastapi import APIRouter,status,Depends,HTTPException
from API.dtos import CreateUserDTO,LoginDTO
from API.user_service import *
from API.auth import get_current_user, jwt_decode_token
router_user = APIRouter()

def get_session():
    with Session(engine) as session:
        yield session  # Yield the session for use in endpoints

@router_user.post("/signup", status_code=status.HTTP_201_CREATED)
def create_user(create_user_request: CreateUserDTO, session: Session = Depends(get_session)):
    user=register_user(create_user_request,session)
    return user

@router_user.post("/facial-rec-signin", response_model=dict)
def login_for_access_token(session: Session = Depends(get_session)):
    return login_with_face(session)

@router_user.post("/login", response_model=dict)
def login_for_access_token(login_request: LoginDTO, session: Session = Depends(get_session)):
    return manual_login(session,login_request)

@router_user.get("/user", status_code=status.HTTP_200_OK)
def user(user: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication Failed")
    return {"User": user}  

@router_user.post("/capture/{user_id}")
def capture(user_id: int, session: Session = Depends(get_session)):
    capture_face(user_id,session)

@router_user.post("/decode_token")
def decode(credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    jwt_decode_token(credentials)

# @router_user.post("/accept_challenge/{challenge_id}", status_code=status.HTTP_200_OK)
# def accept_challenge(challenge_id: int,session: Session = Depends(get_session),user: dict = Depends(jwt_decode_token)):
#     return join_challenge(challenge_id,session,user)