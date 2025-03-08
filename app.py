from flask import Flask, request, jsonify
import numpy as np
import cv2
from insightface.app import FaceAnalysis
from huggingface_hub import snapshot_download
import os

app = Flask(__name__)

# Download and load AuraFace model
MODEL_DIR = "models/auraface"
if not os.path.exists(MODEL_DIR):
    snapshot_download("fal/AuraFace-v1", local_dir=MODEL_DIR)

face_app = FaceAnalysis(
    name="auraface",
    providers=["CUDAExecutionProvider", "CPUExecutionProvider"],
    root="."
)
face_app.prepare(ctx_id=0)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    image = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    faces = face_app.get(image)
    if not faces:
        return jsonify({"error": "No face detected"}), 400

    embedding = faces[0].normed_embedding.tolist()
    return jsonify({"embedding": embedding})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
