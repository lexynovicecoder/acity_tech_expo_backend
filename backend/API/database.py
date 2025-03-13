from sqlmodel import create_engine
import os
from dotenv import load_dotenv
from API.models import Admin
from passlib.context import CryptContext
from sqlmodel import Session, select, SQLModel
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)


# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)
#     add_hardcoded_users()

# def add_hardcoded_users():
#     with Session(engine) as session:
#         # Check if users already exist
#         existing_user = session.exec(select(Admin)).first()
#         if existing_user:
#             return  # Users already exist

#         # Hardcoded Users
#         users = [
#             Admin(email="jane@gmail.com", hashed_password=pwd_context.hash("admin123"), is_admin=True),
#             Admin(email="doreenda@gmail.com", hashed_password=pwd_context.hash("password123"), is_admin=True),
#         ]
        
#         session.add_all(users)
#         session.commit()
#         print("✅ Hardcoded users added successfully!")

# if __name__ == "__main__":
#     create_db_and_tables()

