import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [loaded, setLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setLoaded(true), 500);
    
    // Start fade out after 3 seconds (adjust timing as needed)
    setTimeout(() => setFadeOut(true), 3000);
    
    // Call the onComplete callback to navigate to the main app
    setTimeout(() => {
      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    }, 3500);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        backgroundImage: "linear-gradient(135deg, #065f46 0%, #0c4a6e 50%, #312e81 100%)",
        backgroundSize: "200% 200%",
        backgroundPosition: "50% 50%"
      }}>
      <div className="flex flex-col items-center justify-center">
        {/* Logo container with pulsing effect */}
        <div className={`relative mb-8 transition-all duration-1000 ease-out transform ${loaded ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4 opacity-0'}`}>
          {/* Bin icon with animated lid */}
          <div className="relative w-40 h-40 mx-auto">
            {/* Bin body */}
            <div className="absolute bottom-0 w-32 h-28 bg-green-500 rounded-b-lg mx-auto left-0 right-0 shadow-lg border-2 border-white overflow-hidden">
              {/* Inner bin gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600"></div>
              
              {/* Animated recycling symbol */}
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-1500 ease-in-out ${loaded ? 'rotate-360' : 'rotate-0'}`}>
                <svg className="w-16 h-16 text-white opacity-30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 19L12 14L17 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.39 12.72C21.3653 11.5553 21.7388 9.98657 21.3943 8.49329C21.0499 7.00001 20.0251 5.78379 18.6283 5.18401C17.2315 4.58423 15.6311 4.66608 14.3143 5.4059C12.9976 6.14572 12.1023 7.45729 11.89 8.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.13 12.13L20.39 12.72L21 8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.61 11.28C2.63468 12.4447 2.26125 14.0134 2.60568 15.5067C2.95011 17 3.97485 18.2162 5.37165 18.816C6.76845 19.4158 8.36876 19.3339 9.68555 18.5941C11.0023 17.8543 11.8977 16.5427 12.11 15.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.87 11.87L3.61 11.28L3 15.52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Bin lid with animation */}
            <div 
              className={`absolute top-0 w-40 h-12 bg-green-400 rounded-t-lg mx-auto left-0 right-0 shadow-lg border-2 border-white transition-all duration-1000 ease-in-out ${loaded ? 'transform -rotate-30 translate-x-5 translate-y-0' : ''}`}
              style={{transformOrigin: 'right top'}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-500"></div>
            </div>
            
            {/* Digital scan effect */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1 bg-green-200 opacity-70 transition-transform duration-2000 ease-in-out ${loaded ? 'transform translate-y-40' : ''}`}
              style={{
                boxShadow: '0 0 10px 3px rgba(167, 243, 208, 0.7)'
              }}
            ></div>
          </div>
          
          {/* Pulsing circles behind the bin */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-green-300 opacity-0 ${loaded ? 'animate-ping-slow' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-green-200 opacity-0 ${loaded ? 'animate-ping-slower' : ''}`}></div>
        </div>

        {/* Text with staggered animation */}
        <div className="text-center">
          <h1 className={`text-5xl font-bold text-white mb-2 transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <span className="text-green-400">Q</span> 
            <span className="text-white">BIN</span>
          </h1>
          <p className={`text-green-200 text-lg transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Smart Waste, Smarter Future
          </p>
          
          {/* Loading dots */}
          <div className={`mt-8 flex justify-center space-x-2 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
      
      {/* Quantum particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 bg-green-200 rounded-full opacity-0 ${loaded ? 'animate-float' : ''}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Logo attribution */}
      <div className={`absolute bottom-4 text-center w-full text-green-300 text-xs transition-all duration-1000 delay-700 transform ${loaded ? 'translate-y-0 opacity-70' : 'translate-y-4 opacity-0'}`}>
        QuantumCity™ Technologies
      </div>
    </div>
  );
};

// Add custom animation keyframes
const customStyles = `
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 0; }
    50% { opacity: 0.3; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  
  @keyframes ping-slower {
    0% { transform: scale(1); opacity: 0; }
    50% { opacity: 0.15; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  
  @keyframes float {
    0% { transform: translate(0, 0) scale(1); opacity: 0; }
    25% { opacity: 0.8; }
    50% { transform: translate(100px, -100px) scale(2); }
    75% { opacity: 0.8; }
    100% { transform: translate(0, -200px) scale(0); opacity: 0; }
  }
  
  @keyframes rotate-360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  .animate-ping-slower {
    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  
  .rotate-360 {
    animation: rotate-360 10s linear infinite;
  }
  
  .-rotate-30 {
    transform: rotate(-30deg);
  }
`;

// This would be included in your global CSS or a style tag
const SplashScreenWithStyles = ({ onComplete }) => (
  <>
    <style>{customStyles}</style>
    <SplashScreen onComplete={onComplete} />
  </>
);

export default SplashScreenWithStyles;