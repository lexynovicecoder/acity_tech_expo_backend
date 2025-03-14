import React, { useState, useEffect, useRef } from "react";

const FacialRecognitionScreen = ({ onComplete, onBack, token }) => {
  const [scanningState, setScanningState] = useState("initial");
  const [scanMessage, setScanMessage] = useState("Position your face in the frame");
  const [progressValue, setProgressValue] = useState(0);
  const [userID, setUserID] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);

  
  

  useEffect(() => {
    async function fetchUserID() {
      try {
        const response = await fetch("http://192.168.0.180:10133/decode_token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error("Failed to decode token");

        const data = await response.json();
        setUserID(data.userID); // Store userID
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }

    if (token) fetchUserID();
  }, [token]);
  
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size to match video feed
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Draw video frame onto canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to base64 image
    return canvas.toDataURL("image/jpeg");
  };

  const sendImageToBackend = async () => {
    if (!userID) {
      console.error("User ID not available");
      return;
    }

    const imageData = captureImage();
    if (!imageData) {
      console.error("Failed to capture image");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.180:10133/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, image: imageData }),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (result.success) {
        setScanningState("success");
        setScanMessage("Face registered successfully!");
        setTimeout(() => onComplete(), 1500);
      } else {
        setScanningState("error");
        setScanMessage("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error sending image:", error);
      setScanningState("error");
      setScanMessage("Error occurred. Please try again.");
    }
  };
  const startScan = () => {
    if (scanningState === "scanning") return;
    
    setScanningState("scanning");
    setScanMessage("Scanning your face...");
    setProgressValue(0);
    
    // Reset canvas and start drawing face detection visualization
    drawFaceDetectionVisuals();
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setProgressValue(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // 90% chance of success for demo purposes
        if (Math.random() < 0.9) {
          setScanningState("success");
          setScanMessage("Face verified successfully!");
          
          // Navigate to next screen after a delay
          setTimeout(() => {
            onComplete();
          }, 1500);
        } else {
          setScanningState("error");
          setScanMessage("Verification failed. Please try again.");
        }
      }
    }, 100);
  };
  
  // Simulate face detection visualization
  const drawFaceDetectionVisuals = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const drawFrame = () => {
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      if (scanningState === "scanning" || scanningState === "success") {
        // Draw face detection rectangle simulation
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const rectWidth = 220;
        const rectHeight = 280;
        
        context.strokeStyle = scanningState === "success" ? "#10b981" : "#60a5fa";
        context.lineWidth = 2;
        
        // Add slight random movement to simulate tracking
        const jitter = scanningState === "scanning" ? Math.random() * 6 - 3 : 0;
        
        context.beginPath();
        context.rect(
          centerX - rectWidth/2 + jitter,
          centerY - rectHeight/2 + jitter,
          rectWidth,
          rectHeight
        );
        context.stroke();
        
        // Draw facial feature points simulation
        if (scanningState === "scanning" || scanningState === "success") {
          context.fillStyle = scanningState === "success" ? "#10b981" : "#60a5fa";
          
          // Eyes
          context.beginPath();
          context.arc(centerX - 40 + jitter, centerY - 40 + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          context.beginPath();
          context.arc(centerX + 40 + jitter, centerY - 40 + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          // Nose
          context.beginPath();
          context.arc(centerX + jitter, centerY + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          // Mouth corners
          context.beginPath();
          context.arc(centerX - 35 + jitter, centerY + 40 + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          context.beginPath();
          context.arc(centerX + 35 + jitter, centerY + 40 + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          // Jaw line points
          context.beginPath();
          context.arc(centerX - 70 + jitter, centerY + 20 + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          context.beginPath();
          context.arc(centerX + 70 + jitter, centerY + 20 + jitter, 3, 0, 2 * Math.PI);
          context.fill();
          
          // Additional processing visualization
          if (scanningState === "scanning") {
            // Scanning lines
            context.strokeStyle = "rgba(96, 165, 250, 0.5)";
            context.beginPath();
            context.moveTo(0, centerY + 50 * Math.sin(Date.now() / 500));
            context.lineTo(canvas.width, centerY + 50 * Math.sin(Date.now() / 500));
            context.stroke();
          }
        }
        
        // Success checkmark
        if (scanningState === "success") {
          const checkX = centerX;
          const checkY = centerY + 100;
          
          context.strokeStyle = "#10b981";
          context.lineWidth = 4;
          context.beginPath();
          context.arc(checkX, checkY, 30, 0, 2 * Math.PI);
          context.stroke();
          
          context.beginPath();
          context.moveTo(checkX - 15, checkY);
          context.lineTo(checkX - 5, checkY + 10);
          context.lineTo(checkX + 15, checkY - 10);
          context.stroke();
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };
    
    drawFrame();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-gradient-animate overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(135deg, #065f46 0%, #0c4a6e 50%, #312e81 100%)",
        backgroundSize: "200% 200%",
        backgroundPosition: "50% 50%"
      }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, 0.4)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container max-w-md mx-auto px-4 z-10 animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center mb-4">
            <span className="text-4xl font-bold text-white">
              <span className="text-green-400">Q</span>
              <span>BIN</span>
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 text-shadow">
            Face Verification
          </h1>
          <p className="text-blue-100">
            Secure your account with facial recognition
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6">
          <div className="relative mb-6 rounded-lg overflow-hidden bg-black/30 aspect-[4/3] flex items-center justify-center">
            {/* Video feed */}
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Detection overlay */}
            <canvas 
              ref={canvasRef}
              className="absolute inset-0 w-full h-full" 
              width={640}
              height={480}
            />
            
            {/* Scanning animation */}
            {scanningState === "initial" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-64 h-64 border-2 border-blue-400/70 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-56 h-56 border-2 border-blue-400/50 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-blue-400/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Success animation */}
            {scanningState === "success" && (
              <div className="absolute inset-0 bg-green-500/20"></div>
            )}
            
            {/* Error animation */}
            {scanningState === "error" && (
              <div className="absolute inset-0 bg-red-500/20"></div>
            )}
          </div>
          
          {/* Status message */}
          <div className="text-center mb-6">
            <p className={`text-lg font-medium ${
              scanningState === "success" ? "text-green-400" : 
              scanningState === "error" ? "text-red-400" : 
              "text-blue-100"
            }`}>
              {scanMessage}
            </p>
            
            {scanningState === "scanning" && (
              <div className="w-full bg-white/10 rounded-full h-2.5 mt-3">
                <div 
                  className="bg-blue-400 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            <button 
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            
            <button 
              onClick={startScan}
              disabled={scanningState === "scanning"}
              className={`flex-1 px-6 py-3 font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                scanningState === "scanning" 
                  ? "bg-blue-500/70 text-white/70 cursor-not-allowed" 
                  : scanningState === "error"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-red-700/20"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-700/20"
              }`}
            >
              {scanningState === "initial" ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Start Scan
                </>
              ) : scanningState === "scanning" ? (
                <>
                  <svg className="animate-spin w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Scanning...
                </>
              ) : scanningState === "success" ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Continue
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-blue-100">
            <p>Having trouble? <button className="text-green-400 hover:text-green-300">Skip for now</button></p>
          </div>
        </div>
      </div>
      
      {/* Company name */}
      <div className="absolute bottom-4 text-center w-full text-blue-300/70 text-xs animate-fade-in" style={{ animationDelay: "1s" }}>
        QuantumCity™ Technologies
      </div>
      
      {/* Style definitions */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(5px, -5px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .text-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default FacialRecognitionScreen;