#!/bin/bash

echo "Creating model directory..."
mkdir -p models/auraface
cd models/auraface

echo "Downloading models from Google Drive..."
gdown --id 1_PJVMVhQcg-1l2mAnkRzp0Nzs0AUgFXh -O 1k3d68.onnx
gdown --id ZgaS65kQ7-2PMByoKAaNZdWEpMn4dsHx -O 2d106det.onnx
gdown --id 1IqtYMs55jvL39CDmK_AMXTgSk6xuv-sc -O genderage.onnx
gdown --id 1rz0UKW1-ucpfZUl9PtmpN7FLL95IZ5gS -O glintr100.onnx
gdown --id 1rz0UKW1-ucpfZUl9PtmpN7FLL95IZ5gS -O scrfd_10g_bnkps.onnx  # Detection model

echo "Checking if models exist..."
ls -lah

cd ../..

echo "Starting application..."
python main.py
