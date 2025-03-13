from flask import Flask, request, jsonify
import onnxruntime
import numpy as np

app = Flask(__name__)

# Load models (ensure these are in your working directory)
scrfd_session = onnxruntime.InferenceSession("models/auraface/scrfd_2.5g_bnkps.onnx", providers=["CPUExecutionProvider"])
glint_session = onnxruntime.InferenceSession("models/auraface/w600k_mbf.onnx", providers=["CPUExecutionProvider"])

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    input_array = np.array(data["input"]).astype(np.float32)

    # Perform inference
    result_scrfd = scrfd_session.run(None, {"input": input_array})
    result_glint = glint_session.run(None, {"input": input_array})

    return jsonify({"scrfd_result": result_scrfd[0].tolist(), "glint_result": result_glint[0].tolist()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
