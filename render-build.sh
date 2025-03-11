#!/bin/bash

# Set model directory
MODEL_DIR="models/auraface"

# Create the directory if it doesn't exist
mkdir -p $MODEL_DIR

echo "📥 Installing dependencies..."
pip install --no-cache-dir insightface huggingface_hub onnxruntime

echo "📥 Downloading AuraFace models..."
python3 - <<EOF
from huggingface_hub import snapshot_download

snapshot_download(
    repo_id="fal/AuraFace-v1",
    local_dir="$MODEL_DIR",
    force_download=True,  # Ensures fresh download
    allow_patterns=["scrfd_2.5g_bnkps.onnx", "w600k_mbf.onnx"],

)
EOF

echo "✅ AuraFace models downloaded successfully!"
