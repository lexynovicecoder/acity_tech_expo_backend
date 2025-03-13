from fastapi import FastAPI, Response, status, Depends, HTTPException
import uvicorn
from sqlmodel import Session, create_engine,SQLModel
from API.database import DATABASE_URL
from API.models import User
from contextlib import asynccontextmanager
from API.admin_routers import router_admin
from API.user_routers import router_user
import uvicorn
from fastapi.middleware.cors import CORSMiddleware # import here


engine = create_engine(DATABASE_URL, echo=True)





def get_session():
    with Session(engine) as session:
        yield session  # Yield the session for use in endpoints


def create_db_and_table():
    SQLModel.metadata.create_all(engine)  # creates table for model


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_table()
    yield

app = FastAPI(lifespan=lifespan)

# declare origin/s
# origins = [
#     "http://192.168.0.180:10133",
#     "http://localhost:5173/"
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def example():
    return {"Title": "Gamified Bin"}

app.include_router(router_user,tags=['User'])
app.include_router(router_admin,tags=['Admin'])

if __name__ == "__main__":
   

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=10133,
    )

    