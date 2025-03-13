import React, { useState } from "react";

const CustomerAuthScreen = ({ onContinue }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError("");
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    // In a real app, you would handle social authentication here
    setTimeout(() => {
      setIsLoading(false);
      onContinue();
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
  
    if (!isSignIn && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const endpoint = isSignIn ? "login" : "signup";  // Determine correct API route

      const response = await fetch(`http://192.168.0.180:10133/${endpoint}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
});

  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }
  
      // Handle successful login/signup
      localStorage.setItem("token", data.token); // Store the token
      onContinue(); // Navigate to the next screen
  
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            {isSignIn ? "Welcome Back" : "Join The Revolution"}
          </h1>
          <p className="text-blue-100">
            {isSignIn ? "Sign in to continue your eco-journey" : "Create your account to save the planet"}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-white/10 rounded-lg p-1">
            <button 
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 rounded-md text-center transition-all duration-300 ${
                isSignIn 
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow" 
                  : "text-blue-100 hover:bg-white/5"
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 rounded-md text-center transition-all duration-300 ${
                !isSignIn 
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow" 
                  : "text-blue-100 hover:bg-white/5"
              }`}
            >
              Sign Up
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            <button 
              onClick={() => handleSocialAuth('google')}
              className="w-full py-3 px-4 bg-white rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-300 disabled:opacity-70"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
              </svg>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
            
            <button 
              onClick={() => handleSocialAuth('apple')}
              className="w-full py-3 px-4 bg-black rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 transition duration-300 disabled:opacity-70"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Zm2.52,7.44A4.51,4.51,0,0,1,18.68,9a4.42,4.42,0,0,0-3.33-1.83c-1.38-.15-2.78.84-3.5.84s-2.26-.86-3.73-.83A4.64,4.64,0,0,0,4.29,9.66c-1.73,3-.44,7.35,1.21,9.77.83,1.17,1.79,2.49,3,2.45s1.7-.82,3.19-.82,1.91.82,3.21.79,2.17-1.17,3-2.35a9.68,9.68,0,0,0,1.32-2.72A4.38,4.38,0,0,1,17.46,12.63Z" />
              </svg>
              <span className="text-white font-medium">Continue with Apple</span>
            </button>
          </div>
          
          <div className="relative flex items-center justify-center mb-6">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="flex-shrink-0 mx-4 text-blue-100 text-sm">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-blue-100 text-sm mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-blue-100 text-sm mb-1">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            
            {!isSignIn && (
              <div>
                <label htmlFor="confirmPassword" className="block text-blue-100 text-sm mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            )}
            
            {isSignIn && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-green-400 hover:text-green-300">Forgot password?</a>
              </div>
            )}
            
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-700/20 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>{isSignIn ? "Sign In" : "Create Account"}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-blue-100">
            {isSignIn ? (
              <p>New to QBIN? <button onClick={toggleAuthMode} className="text-green-400 hover:text-green-300">Create an account</button></p>
            ) : (
              <p>By signing up, you agree to our <a href="#" className="text-green-400 hover:text-green-300">Terms</a> and <a href="#" className="text-green-400 hover:text-green-300">Privacy Policy</a></p>
            )}
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

export default CustomerAuthScreen;