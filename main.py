from fastapi import FastAPI, File, UploadFile
import uvicorn
from sqlmodel import Session, create_engine,SQLModel
from API.database import DATABASE_URL
from API.models import User
from contextlib import asynccontextmanager
from API.admin_routers import router_admin
from API.user_routers import router_user
import uvicorn
import numpy as np
import cv2
from insightface.app import FaceAnalysis
from huggingface_hub import snapshot_download
import os

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
# Download and load AuraFace model
MODEL_DIR = "models/auraface"
if not os.path.exists(MODEL_DIR):
    snapshot_download("fal/AuraFace-v1", local_dir=MODEL_DIR)

face_app = FaceAnalysis(
    name="auraface",
    providers=["CPUExecutionProvider"],  # Change to "CUDAExecutionProvider" if using GPU
    root="."
)
face_app.prepare(ctx_id=0)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image = np.frombuffer(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    faces = face_app.get(image)
    if not faces:
        return {"error": "No face detected"}

    embedding = faces[0].normed_embedding.tolist()
    return {"embedding": embedding}

# Add your other FastAPI endpoints below


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