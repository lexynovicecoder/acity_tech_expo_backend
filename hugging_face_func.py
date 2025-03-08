import cv2
import numpy as np
from insightface.app import FaceAnalysis
from fastapi import HTTPException

# Initialize FaceAnalysis
face_app = FaceAnalysis(name="auraface", providers=["CPUExecutionProvider"], root=".")
face_app.prepare(ctx_id=0, det_size=(640, 640))

def capture_images_and_encode():
    video_capture = cv2.VideoCapture(0)

    captured_embeddings = []
    total_images = 30  # Number of images to capture
    count = 0

    print("\n📸 Capturing 30 images. Please look straight at the camera.")

    while count < total_images:
        ret, frame = video_capture.read()
        if not ret:
            continue

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = face_app.get(rgb_frame)

        if faces:
            face_encoding = faces[0].normed_embedding
            captured_embeddings.append(face_encoding)
            count += 1
            print(f"✅ Captured {count}/{total_images}")
        else:
            print(f"⚠️ No face detected. Retrying...")

        cv2.imshow("Register Face", frame)
        cv2.waitKey(100)  # Short delay

    video_capture.release()
    cv2.destroyAllWindows()

    if not captured_embeddings:
        raise HTTPException(status_code=400, detail="No valid images captured.")

    # Compute the **average** face embedding
    average_embedding = np.mean(captured_embeddings, axis=0).astype(np.float32)

    return average_embedding.tobytes()  # Convert to bytes for storage
