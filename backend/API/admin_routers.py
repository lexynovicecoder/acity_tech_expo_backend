from typing import Annotated
from sqlmodel import Session
from API.database import engine
from fastapi import APIRouter,status,Depends,HTTPException,Response
from API.dtos import AdminLoginDTO
from API.admin_services import *
from API.auth import Token,security_scheme,get_current_user, jwt_decode_token
from API.dtos import CreateChallengeDTO

router_admin = APIRouter()

def get_session():
    with Session(engine) as session:
        yield session  # Yield the session for use in endpoints



@router_admin.post("/admin_signin", response_model=Token)
def login_for_access_token(login:AdminLoginDTO ,session: Session = Depends(get_session)):
    return login_for_token(login,session)

@router_admin.post("/create_challenges", response_model=Challenge)
def create(dto: CreateChallengeDTO, session: Session = Depends(get_session), admin: dict = Depends(jwt_decode_token)):
    challenge = create_challenges(dto,session,admin)
    return challenge

@router_admin.get("/admin", status_code=status.HTTP_200_OK)
def admin(admin: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    if admin is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication Failed")
    if admin.get('is_admin') == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an Admin")
    return {"Admin": admin}  

@router_admin.put("/{challenge_id}", response_model=Challenge)
def update_challenge(challenge_id: int,challenge: CreateChallengeDTO, payload: dict = Depends(jwt_decode_token),session: Session = Depends(get_session)):
    update = edit_challenge(session=session,id=challenge_id,dto=challenge, payload=payload)
    return update

@router_admin.delete("/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(response: Response,challenge_id: int, payload: dict = Depends(jwt_decode_token),session: Session = Depends(get_session)):
    return delete_challenge(session=session,id=challenge_id,payload=payload,response=response)