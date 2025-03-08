#!/bin/bash

pip install -r requirements.txt
pip install gdown


echo "Creating model directory..."
mkdir -p models/auraface
cd models/auraface

echo "Downloading models from Google Drive..."
gdown 19Imx9B_B_uw8QMjIHmMItWcxS3bVEw7- -O 1k3d68.onnx
gdown 1sNpKPL1OTqai1-xERY2Z4qGDwImYWejD -O 2d106det.onnx
gdown 1WLQXNj-Y_Bn6jambm8DJsWky8UDxiC8C -O genderage.onnx
gdown 1b64c2Jrv_CuCmU6g8fBc4G0w52ICs7MF -O glintr100.onnx
gdown 1b64c2Jrv_CuCmU6g8fBc4G0w52ICs7MF -O scrfd_10g_bnkps.onnx  # Detection model

echo "Checking if models exist..."
ls -lah

cd ../..

echo "Starting application..."
python main.py
