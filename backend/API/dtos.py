from pydantic import BaseModel
from datetime import datetime,timedelta
from typing import Optional,List
from sqlmodel import Field
from API.models import User

class CreateUserDTO(BaseModel):
    email: str
    password: str

class LoginDTO(BaseModel):
    email: str
    password: str

class AdminLoginDTO(BaseModel):
    email: str 
    password: str

class CreateChallengeDTO(BaseModel):
    name: str
    