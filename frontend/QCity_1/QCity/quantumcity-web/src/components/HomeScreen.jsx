import React, { useState, useEffect } from 'react';
import { AvatarSelection, RenderAvatar, getSecondaryColor } from './AvatarSelection';

const HomeScreen = ({ onNavigate, userData, loggedInUser  }) => {
  const users = [
    { email: 'alexandra@gmail.com', avatar: { name: 'Aqua', style: 'water', color: '#0ea5e9' }, level: 3 },
    { email: 'riya@gmail.com', avatar: { name: 'Terra', style: 'forest', color: '#84cc16' }, level: 5 },
    { email: 'riy@gmail.com', avatar: { name: 'Spark', style: 'energy', color: '#f97316' }, level: 2 },
  ];

  const matchedUser  = users.find(user => user.email === loggedInUser );

  const [showAvatarSelection, setShowAvatarSelection] = useState(() => {
    return !matchedUser  && localStorage.getItem('hasSelectedAvatar') !== 'true';
  });

  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    if (matchedUser ) {
      return matchedUser .avatar; // Assign the matched user's avatar
    }
    const savedAvatar = localStorage.getItem('selectedAvatar');
    return savedAvatar ? JSON.parse(savedAvatar) : null;
  });

  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(() => {
    const savedIndex = localStorage.getItem('selectedAvatarIndex');
    return savedIndex ? parseInt(savedIndex) : 0;
  });

  const avatarOptions = [
    { name: 'Aqua', style: 'water', color: '#0ea5e9' },
    { name: 'Terra', style: 'forest', color: '#84cc16' },
    { name: 'Spark', style: 'energy', color: '#f97316' },
    { name: 'Echo', style: 'recycle', color: '#d946ef' },
    { name: 'Gaia', style: 'classic', color: '#10b981' }
  ];

  const navigateAvatars = (direction) => {
    setSelectedAvatarIndex(prev => (direction === 'next' ? (prev + 1) % avatarOptions.length : (prev - 1 + avatarOptions.length) % avatarOptions.length));
  };

  const handleAvatarSelect = () => {
    const avatar = avatarOptions[selectedAvatarIndex];
    setSelectedAvatar(avatar);
    setShowAvatarSelection(false);
    localStorage.setItem('hasSelectedAvatar', 'true');
    localStorage.setItem('selectedAvatar', JSON.stringify(avatar));
    localStorage.setItem('selectedAvatarIndex', selectedAvatarIndex.toString());
  };

  const getPositionFromAngle = (angle, radius) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius };
  };

  const floatingElements = [
    { name: 'Profile', icon: '👤', angle: 240, route: 'profile' },
    { name: 'Activities', icon: '📋', angle: 285, route: 'activities' },
    { name: 'Ranks', icon: '🥇', angle: 335, route: 'ranks' },
    { name: 'Challenges', icon: '🎯', angle: 25, route: 'challenges' },
    { name: 'Feed', icon: '📱', angle: 75, route: 'feed' },
    { name: 'Settings', icon: '⚙️', angle: 125, route: 'settings' }
  ];

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, 0.4)`,
              animation: `float ${5 + Math.random() * 7}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      {showAvatarSelection && (
        <AvatarSelection
          avatarOptions={avatarOptions}
          selectedAvatarIndex={selectedAvatarIndex}
          navigateAvatars={navigateAvatars}
          handleAvatarSelect={handleAvatarSelect}
        />
      )}
      {!showAvatarSelection && selectedAvatar && (
        <div className="relative h-full w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white">Eco Heroes</h1>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border border-white/20" style={{ width: '300px', height: '300px', left: '-126px', top: '-126px' }}></div>
              <div 
                className="w-48 h-48 rounded-full shadow-2xl flex items-center justify-center z-10 relative"
                style={{ backgroundImage: `linear-gradient(135deg, ${selectedAvatar.color} 0%, ${getSecondaryColor(selectedAvatar.style)} 100%)` }}
              >
                <RenderAvatar style={selectedAvatar.style} />
              </div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <h2 className="text-xl font-bold text-white">{userData?.username || selectedAvatar.name}</h2>
                <p className="text-xs text-green-300">ECO HERO</p>
              </div>
              {floatingElements.map((element, index) => {
                const pos = getPositionFromAngle(element.angle, 150);
                return (
                  <div key={index} className="absolute" style={{ left: `calc(50% + ${pos.x}px - 20px)`, top: `calc(50% + ${pos.y}px - 20px)`, zIndex: 20 }}>
                    <button
                      onClick={() => onNavigate(element.route)}
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-lg shadow-lg border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30 group z-10 relative"
                    >
                      <span className="text-2xl">{element.icon}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;