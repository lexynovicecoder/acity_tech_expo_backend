#!/bin/bash

# Set model directory
MODEL_DIR="models/auraface"

# Create the directory if it doesn't exist
mkdir -p "$MODEL_DIR"

echo "📥 Installing dependencies..."
pip install --no-cache-dir insightface huggingface_hub onnxruntime

echo "📥 Downloading AuraFace models..."
python3 - <<EOF
from huggingface_hub import snapshot_download
import shutil
import os

download_dir = "models/temp_auraface"

# Download to a temp directory
snapshot_download(
    repo_id="fal/AuraFace-v1",
    local_dir=download_dir,
    force_download=True,
    allow_patterns=["scrfd_2.5g_bnkps.onnx", "w600k_mbf.onnx"],
)

# Ensure final model directory exists
os.makedirs("$MODEL_DIR", exist_ok=True)

# Move downloaded models to correct location
for file in os.listdir(download_dir):
    shutil.move(os.path.join(download_dir, file), "$MODEL_DIR")

# Remove temp directory
shutil.rmtree(download_dir)
EOF

echo "✅ AuraFace models downloaded successfully!"
