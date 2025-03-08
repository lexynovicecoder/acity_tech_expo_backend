#!/bin/bash

# Create the model directory if it doesn't exist
mkdir -p models/auraface
cd models/auraface

# Download the model zip file
wget -q https://github.com/deepinsight/insightface/releases/download/v0.7/auraface.zip

# Extract the files
unzip -o auraface.zip

# Remove the zip file to save space
rm auraface.zip

echo "Models downloaded and extracted successfully."
