import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios for API calls

const FacialRecognitionScreen = ({ onComplete, onBack }) => {
  const [scanningState, setScanningState] = useState("initial"); 
  const [scanMessage, setScanMessage] = useState("Position your face in the frame");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = { video: { width: 1280, height: 720, facingMode: "user" } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
        setScanningState("error");
        setScanMessage("Camera access denied. Please allow camera access.");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Capture image and send to backend
  const startScan = async () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    setScanningState("scanning");
    setScanMessage("Scanning your face...");
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL("image/jpeg"); // Convert to Base64
    try {
      const response = await axios.post("http://127.0.0.1:8000/facial-rec-signin", { image: imageData });
      
      if (response.data.success) {
        setScanningState("success");
        setScanMessage("Face verified successfully!");
        setTimeout(onComplete, 1500);
      } else {
        setScanningState("error");
        setScanMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending image:", error);
      setScanningState("error");
      setScanMessage("Error verifying face. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Face Verification</h1>
        <p className="text-gray-600">{scanMessage}</p>
        
        <div className="relative w-64 h-48 mt-4 border-2 border-gray-300 rounded-lg">
          <video ref={videoRef} autoPlay playsInline muted className="absolute w-full h-full"></video>
          <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
        </div>

        <button
          onClick={startScan}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${
            scanningState === "scanning" ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={scanningState === "scanning"}
        >
          {scanningState === "scanning" ? "Scanning..." : "Start Scan"}
        </button>
      </div>
    </div>
  );
};

export default FacialRecognitionScreen;
