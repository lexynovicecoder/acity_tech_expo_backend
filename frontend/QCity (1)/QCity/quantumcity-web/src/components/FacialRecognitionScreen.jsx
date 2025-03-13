import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios for API calls

const FacialRecognitionScreen = ({ onComplete, onBack }) => {
  const [scanningState, setScanningState] = useState("initial"); 
  const [scanMessage, setScanMessage] = useState("Press the button to start scanning");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera for live preview
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

  // Start authentication process (backend captures the image)
  const startScan = async () => {
    setScanningState("scanning");
    setScanMessage("Scanning your face...");

    try {
      const response = await axios.post("http://127.0.0.1:8000/facial-rec-signin");

      if (response.data.access_token) {
        setScanningState("success");
        setScanMessage("Face verified successfully!");
        localStorage.setItem("token", response.data.access_token); // Store token
        setTimeout(() => onComplete(response.data.access_token), 1500); // Pass token on success
      } else {
        setScanningState("error");
        setScanMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying face:", error);
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
