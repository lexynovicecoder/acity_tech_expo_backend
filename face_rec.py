import cv2
import pickle
import numpy as np
from insightface.app import FaceAnalysis
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import HTTPException
from sqlmodel import select
from API.models import User, UserEncoding






# Load AuraFace model
face_app = FaceAnalysis(name="auraface", providers="CPUExecutionProvider", root=".")
face_app.prepare(ctx_id=0, det_size=(640, 640))


def capture_and_authenticate_user(session):
    video_capture = cv2.VideoCapture(0)
    print("📷 Looking for a face...")

    while True:
        ret, frame = video_capture.read()
        if not ret:
            continue
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = face_app.get(rgb_frame)
        
        if faces:
            print("🔍 Face detected. Comparing...")
            face_encoding = faces[0].normed_embedding
            face_encoding = face_encoding / np.linalg.norm(face_encoding)

            # Fetch all users with their encodings from UserEncoding table
            statement = select(User.id, User.username, UserEncoding.encoding).join(UserEncoding, User.id == UserEncoding.user_id)
            user_encodings = session.exec(statement).all()

            if not user_encodings:
                print("❌ No user encodings found in DB!")
                continue

            match_scores = {}

            # Compare captured face encoding against all stored encodings
            for user_id, username, encoding_bytes in user_encodings:
                stored_encoding = np.frombuffer(encoding_bytes, dtype=np.float32)

                similarity = cosine_similarity(stored_encoding.reshape(1, -1), face_encoding.reshape(1, -1))[0][0]
                match_percentage = similarity * 100  # Convert to percentage

                if username not in match_scores:
                    match_scores[username] = []
                match_scores[username].append(match_percentage)

            # Compute average match per user
            avg_scores = {name: np.mean(scores) if scores else 0 for name, scores in match_scores.items()}
            best_match = max(avg_scores, key=avg_scores.get)
            best_match_score = avg_scores[best_match]

            if best_match_score >= 50:  # Match threshold
                print(f"✅ Best Match: {best_match} ({best_match_score:.2f}%)")
                video_capture.release()
                cv2.destroyAllWindows()
                return best_match  # Return username
            else:
                print("❌ No strong match found. Try again.")
                break

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    video_capture.release()
    cv2.destroyAllWindows()
    raise HTTPException(status_code=401, detail="No valid user found")