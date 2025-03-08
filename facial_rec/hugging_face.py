import cv2
import pickle
import numpy as np
from insightface.app import FaceAnalysis

ENCODINGS_FILE = "huggingface_encodings.pkl"

# Initialize FaceAnalysis
face_app = FaceAnalysis(name="auraface", providers="CPUExecutionProvider", root=".")
face_app.prepare(ctx_id=0, det_size=(640, 640))

video_capture = cv2.VideoCapture(0)
name = input("Enter name for new face: ")

captured_embeddings = []
total_images = 30  # Number of images to capture

print(f"\n📷 Capturing {total_images} images... Please look straight at the camera.")

for i in range(total_images):
    ret, frame = video_capture.read()
    if not ret:
        continue

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    faces = face_app.get(rgb_frame)

    if faces:
        face_encoding = faces[0].normed_embedding
        captured_embeddings.append(face_encoding)
        print(f"✅ Captured {i+1}/{total_images}")
    else:
        print(f"⚠️ No face detected in image {i+1}. Retrying...")

    cv2.imshow("Register Face", frame)
    cv2.waitKey(100)  # Short delay between captures

video_capture.release()
cv2.destroyAllWindows()

if not captured_embeddings:
    print("\n❌ No valid images captured. Please try again.")
    exit()

# Compute the average face embedding
average_embedding = np.mean(captured_embeddings, axis=0).astype(np.float32)

# Load existing encodings
try:
    with open(ENCODINGS_FILE, "rb") as f:
        encodings_dict = pickle.load(f)
except FileNotFoundError:
    encodings_dict = {}

# Save the averaged encoding
encodings_dict[name] = average_embedding

with open(ENCODINGS_FILE, "wb") as f:
    pickle.dump(encodings_dict, f)

print(f"\n✅ Face encoding for {name} saved successfully!")
