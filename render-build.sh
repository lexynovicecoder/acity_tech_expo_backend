#!/bin/bash

# Create model directory
mkdir -p models/auraface
cd models/auraface

# List existing files (for debugging in logs)
echo "Checking existing files in models directory:"
ls -lah

# Download if any file is missing
if [ ! -f "scrfd_10g_bnkps.onnx" ] || [ ! -f "glintr100.onnx" ]; then
    echo "Downloading models..."
    gdown --id FILE_ID_1 -O 1k3d68.onnx
    gdown --id FILE_ID_2 -O 2d106det.onnx
    gdown --id FILE_ID_3 -O genderage.onnx
    gdown --id FILE_ID_4 -O glintr100.onnx
    gdown --id FILE_ID_5 -O scrfd_10g_bnkps.onnx
else
    echo "Models already exist. Skipping download."
fi

echo "Final list of models:"
ls -lah
