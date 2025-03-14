import React from "react";


// Helper function to get secondary color for gradient based on avatar style
const getSecondaryColor = (style) => {
  switch(style) {
    case 'water': return '#2563eb';
    case 'forest': return '#65a30d';
    case 'energy': return '#ea580c';
    case 'recycle': return '#c026d3';
    default: return '#3b82f6'; // Classic
  }
};

// Helper function to get avatar description based on style
const getAvatarDescription = (style) => {
  switch(style) {
    case 'water': return 'Protector of the seas and waterways';
    case 'forest': return 'Defender of forests and wildlife';
    case 'energy': return 'Champion of renewable energy';
    case 'recycle': return 'Master of reducing waste';
    default: return 'All-around environmental champion'; // Classic
  }
};

// Avatar rendering component
const RenderAvatar = ({ style }) => {
  switch(style) {
    case 'water':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 left-10"></div>
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 right-10"></div>
            <div className="absolute w-12 h-6 rounded-full border-2 border-blue-500 top-20 left-10 flex items-center justify-center">
              <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="absolute top-4 w-full h-8 bg-blue-400/30 rounded-full"></div>
          </div>
        </div>
      );
    case 'forest':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 left-10"></div>
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 right-10"></div>
            <div className="absolute w-12 h-6 rounded-full border-2 border-green-700 top-20 left-10 flex items-center justify-center">
              <div className="w-8 h-2 bg-green-700 rounded-full"></div>
            </div>
            <div className="absolute top-2 left-8 w-16 h-6 bg-green-700/50 rounded-t-full"></div>
          </div>
        </div>
      );
    case 'energy':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 left-10"></div>
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 right-10"></div>
            <div className="absolute w-12 h-6 rounded-full border-2 border-yellow-600 top-20 left-10 flex items-center justify-center">
              <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
            </div>
            <div className="absolute top-4 left-14 w-4 h-8 bg-yellow-500 transform rotate-45"></div>
          </div>
        </div>
      );
    case 'recycle':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 left-10"></div>
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 right-10"></div>
            <div className="absolute w-12 h-6 rounded-full border-2 border-purple-600 top-20 left-10 flex items-center justify-center">
              <div className="w-8 h-2 bg-purple-600 rounded-full"></div>
            </div>
            <div className="absolute top-2 left-10 w-12 h-6 bg-purple-400/30 rounded-full"></div>
          </div>
        </div>
      );
    default: // Classic
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 left-10"></div>
            <div className="absolute w-3 h-3 rounded-full bg-black top-10 right-10"></div>
            <div className="absolute w-12 h-6 rounded-full border-2 border-green-500 top-20 left-10 flex items-center justify-center">
              <div className="w-8 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="absolute top-4 left-10 w-12 h-6 bg-green-400/30 rounded-full"></div>
          </div>
        </div>
      );
  }
};

const AvatarSelection = ({ 
  avatarOptions, 
  selectedAvatarIndex, 
  navigateAvatars, 
  handleAvatarSelect 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6 max-w-md mx-4 w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Choose Your Avatar</h2>
          <p className="text-blue-100">Select your eco-hero to start your journey!</p>
        </div>
        
        {/* Avatar carousel */}
        <div className="relative flex items-center justify-center my-8">
          {/* Left navigation arrow */}
          <button 
            onClick={() => navigateAvatars('prev')}
            className="absolute left-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Avatar preview */}
          <div className="mx-auto">
            <div 
              className="w-48 h-48 rounded-full shadow-xl flex items-center justify-center overflow-hidden mx-auto"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${avatarOptions[selectedAvatarIndex].color} 0%, ${getSecondaryColor(avatarOptions[selectedAvatarIndex].style)} 100%)`,
              }}
            >
              {/* Avatar face */}
              <RenderAvatar style={avatarOptions[selectedAvatarIndex].style} />
            </div>
            
            {/* Avatar name */}
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-white">{avatarOptions[selectedAvatarIndex].name}</h3>
              <p className="text-green-300 mt-1">{getAvatarDescription(avatarOptions[selectedAvatarIndex].style)}</p>
            </div>
          </div>
          
          {/* Right navigation arrow */}
          <button 
            onClick={() => navigateAvatars('next')}
            className="absolute right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Avatar indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {avatarOptions.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${selectedAvatarIndex === index ? 'bg-white' : 'bg-white/30'}`}
            ></div>
          ))}
        </div>
        
        {/* Selection button */}
        <button 
          onClick={handleAvatarSelect}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-700/20 transition-all duration-300 hover:from-green-600 hover:to-blue-700"
        >
          Select {avatarOptions[selectedAvatarIndex].name}
        </button>
      </div>
    </div>
  );
};

export { AvatarSelection, RenderAvatar, getSecondaryColor, getAvatarDescription };