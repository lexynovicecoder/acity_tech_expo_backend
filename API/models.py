from sqlmodel import Field, SQLModel, Relationship
from typing import List, Optional
import sqlalchemy as sa

class UserChallenge(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    challenge_id: int = Field(foreign_key="challenge.id")
    level_of_completion: int = Field(default=0)  # Unique for each user in a challenge

    user: Optional["User"] = Relationship(back_populates="challenges")
    challenge: Optional["Challenge"] = Relationship(back_populates="users")


class Admin(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str
    hashed_password: str
    is_admin: bool = True

class UserEncoding(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    encoding: bytes = Field(sa_column=sa.Column(sa.LargeBinary))  # Store encoding as binary

    user: Optional["User"] = Relationship(back_populates="encodings")


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str
    username: str
    hashed_password: str
    total_points: Optional[int] = Field(default=0)
    challenges_completed: Optional[int] = Field(default=0)
    challenges: List["UserChallenge"] = Relationship(back_populates="user")

    encodings: List["UserEncoding"] = Relationship(back_populates="user")
    is_admin: bool = False


class Challenge(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    level_of_completion: Optional[int] = Field(default=0)
    users: List["UserChallenge"] = Relationship(back_populates="challenge",sa_relationship_kwargs={"cascade": "all, delete-orphan"})
