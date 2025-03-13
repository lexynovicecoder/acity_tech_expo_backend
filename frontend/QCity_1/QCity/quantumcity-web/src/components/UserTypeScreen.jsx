import React from "react";

const UserTypeScreen = ({ onSelectCustomer, onSelectCollaborator }) => {
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
      
      <div className="container max-w-4xl mx-auto px-4 z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center mb-4">
            <span className="text-4xl font-bold text-white">
              <span className="text-green-400">Q</span>
              <span>BIN</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow">Choose Your Path</h1>
          <p className="text-lg text-blue-100 max-w-lg mx-auto">
            Join our revolution to save the planet in the way that suits you best.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Customer Card */}
          <div 
            onClick={onSelectCustomer}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:from-white/15 hover:to-white/10 group"
          >
            <div className="mb-4 text-center">
              <div className="w-20 h-20 bg-green-400/20 rounded-full mx-auto flex items-center justify-center group-hover:bg-green-400/30 transition-all duration-300">
                <svg 
                  className="w-10 h-10 text-green-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white text-center mb-3 text-shadow">Customer</h2>
            
            <ul className="space-y-3 text-blue-100 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Dispose waste and earn rewards</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Track your environmental impact</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Compete in challenges and climb ranks</span>
              </li>
            </ul>
            
            <div className="text-center">
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-700/20 transition-all duration-300 w-full">
                <span className="flex items-center justify-center">
                  Select Customer
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          {/* Collaborator Card */}
          <div 
            onClick={onSelectCollaborator}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:from-white/15 hover:to-white/10 group"
          >
            <div className="mb-4 text-center">
              <div className="w-20 h-20 bg-blue-400/20 rounded-full mx-auto flex items-center justify-center group-hover:bg-blue-400/30 transition-all duration-300">
                <svg 
                  className="w-10 h-10 text-blue-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white text-center mb-3 text-shadow">Collaborator</h2>
            
            <ul className="space-y-3 text-blue-100 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Partner with us for waste collection</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access recycling opportunities</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Join our network of sustainability partners</span>
              </li>
            </ul>
            
            <div className="text-center">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-700/20 transition-all duration-300 w-full">
                <span className="flex items-center justify-center">
                  Select Collaborator
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-blue-200/80 text-sm animate-fade-in">
          <p>Your choice determines your journey, but you can always change paths later.</p>
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

export default UserTypeScreen;