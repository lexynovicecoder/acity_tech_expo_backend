import React, { useState, useEffect } from "react";

const OnboardingScreen = ({ onAcceptMission, onLearnMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });
  
  const onboardingMessages = [
    "This planet is drowning in waste.",
    "Waste Management has been an issue since the 1700s",
    "Unfortunately, now it's worse…",
    "Soon, and very soon, Earth won't be a place called home anymore.",
    "We need to change this, and you too can help.",
    "A Task for a person of courage…",
    "Of good conscience",
    "A Revolution begins…."
  ];
  
  // Subtle background animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBgPosition({
        x: 50 + (Math.sin(Date.now() / 5000) * 5),
        y: 50 + (Math.cos(Date.now() / 6000) * 5)
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  const handleNext = () => {
    if (currentIndex < onboardingMessages.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsAnimating(false);
      }, 600);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsAnimating(false);
      }, 600);
    }
  };
  
  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(5px, -5px); }
            100% { transform: translate(0, 0); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.6; transform: scale(1); }
          }
          
          @keyframes slideIn {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slideOut {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0; }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse 4s ease-in-out infinite;
          }
          
          .animate-slide-in {
            animation: slideIn 0.6s ease-out forwards;
          }
          
          .animate-slide-out {
            animation: slideOut 0.6s ease-in forwards;
          }
          
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          
          .bg-gradient-animate {
            transition: background-position 0.5s ease;
          }
          
          .text-shadow {
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
      
      <div 
        className="fixed inset-0 flex items-center justify-center bg-gradient-animate overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, #065f46 0%, #0c4a6e 50%, #312e81 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`
        }}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-0 animate-float"
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
        
        {/* Learn More Info Icon - Top Right Corner */}
        {currentIndex === onboardingMessages.length - 1 && (
          <div className="absolute top-6 right-6 animate-fade-in">
            <button
              onClick={onLearnMore}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
              aria-label="Learn More"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Main content container */}
        <div className="relative max-w-md w-full mx-4">
          {/* Earth illustration */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-20 animate-pulse-slow">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-blue-400"></div>
              <div className="absolute inset-0 rounded-full opacity-60" 
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent 60%)"
                }}
              ></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute opacity-70"
                    style={{
                      width: `${Math.random() * 30 + 20}%`,
                      height: `${Math.random() * 20 + 10}%`,
                      left: `${Math.random() * 80}%`,
                      top: `${Math.random() * 80}%`,
                      backgroundColor: "#047857",
                      borderRadius: `${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}%`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Glowing card container */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 transform transition-transform duration-300 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-blue-500/5"></div>
            
            {/* Glowing edge effect */}
            <div className="absolute inset-0 opacity-30" 
              style={{
                background: "linear-gradient(45deg, transparent 65%, rgba(110, 231, 183, 0.6) 100%)"
              }}
            ></div>
            
            <div className="p-8 relative z-10">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-white">
                    <span className="text-green-400">Q</span>
                    <span>BIN</span>
                  </span>
                </div>
              </div>
              
              {/* Message container with height transition */}
              <div className="h-48 flex items-center justify-center mb-8">
                <div className={`text-center transform ${isAnimating ? 'animate-slide-out' : 'animate-slide-in'}`}>
                  <h2 className="text-3xl font-bold text-white text-shadow">
                    {onboardingMessages[currentIndex]}
                  </h2>
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="flex justify-center mt-6 mb-8">
                {onboardingMessages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 mx-1 rounded-full transition-all duration-500 ${
                      currentIndex === index 
                        ? "bg-green-400 w-4 h-2" 
                        : currentIndex > index 
                          ? "bg-green-300/70" 
                          : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between mt-6 relative">
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 animate-fade-in flex items-center group"
                    disabled={isAnimating}
                  >
                    <svg 
                      className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                )}
                
                {currentIndex < onboardingMessages.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className={`px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all duration-300 animate-fade-in flex items-center group ${!currentIndex ? 'mx-auto' : 'ml-auto'}`}
                    disabled={isAnimating}
                  >
                    Next
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={onAcceptMission}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-700/20 transition-all duration-300 mx-auto group"
                  >
                    <span className="flex items-center">
                      Accept Mission
                      <svg 
                        className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Waste bin decoration */}
          <div className="absolute -bottom-16 -right-16 w-32 h-32 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
            <div className="relative w-full h-full">
              <div className="absolute bottom-0 w-24 h-20 bg-blue-400 rounded-b-lg left-0"></div>
              <div className="absolute top-0 w-28 h-8 bg-blue-500 rounded-t-lg left-0" 
                style={{ transform: "rotate(-15deg)", transformOrigin: "left bottom" }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Company name */}
        <div className="absolute bottom-4 text-center w-full text-blue-300/70 text-xs animate-fade-in" style={{ animationDelay: "1s" }}>
          QuantumCity™ Technologies
        </div>
      </div>
    </>
  );
};

export default OnboardingScreen;