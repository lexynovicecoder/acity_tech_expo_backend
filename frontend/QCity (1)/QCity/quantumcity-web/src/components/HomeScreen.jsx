import React, { useState, useEffect } from 'react';
import { AvatarSelection, RenderAvatar, getSecondaryColor } from './AvatarSelection';

const HomeScreen = ({ onNavigate, userData }) => {
  // Change initial state to false and use localStorage to check if this is first visit
  const [showAvatarSelection, setShowAvatarSelection] = useState(() => {
    // Check if the user has already selected an avatar
    const hasSelectedAvatar = localStorage.getItem('hasSelectedAvatar');
    return hasSelectedAvatar !== 'true';
  });
  
  // Retrieve previously selected avatar from localStorage if available
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('selectedAvatar');
    return savedAvatar ? JSON.parse(savedAvatar) : null;
  });
  
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(() => {
    const savedIndex = localStorage.getItem('selectedAvatarIndex');
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  
  // Define avatar options
  const avatarOptions = [
    { name: 'Aqua', style: 'water', color: '#0ea5e9' },
    { name: 'Terra', style: 'forest', color: '#84cc16' },
    { name: 'Spark', style: 'energy', color: '#f97316' },
    { name: 'Echo', style: 'recycle', color: '#d946ef' },
    { name: 'Gaia', style: 'classic', color: '#10b981' }
  ];

  // Function to navigate through avatars in the selection
  const navigateAvatars = (direction) => {
    if (direction === 'next') {
      setSelectedAvatarIndex((prev) => (prev + 1) % avatarOptions.length);
    } else {
      setSelectedAvatarIndex((prev) => (prev - 1 + avatarOptions.length) % avatarOptions.length);
    }
  };

  // Function to handle avatar selection
  const handleAvatarSelect = () => {
    const avatar = avatarOptions[selectedAvatarIndex];
    setSelectedAvatar(avatar);
    setShowAvatarSelection(false);
    
    // Save selection to localStorage
    localStorage.setItem('hasSelectedAvatar', 'true');
    localStorage.setItem('selectedAvatar', JSON.stringify(avatar));
    localStorage.setItem('selectedAvatarIndex', selectedAvatarIndex.toString());
  };

  // Function to calculate position based on angle
  const getPositionFromAngle = (angle, radius) => {
    const radian = (angle - 90) * (Math.PI / 180); // Start from top (90 deg offset)
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  // Array of floating elements with angle-based positioning
  const floatingElements = [
    { name: 'Profile', icon: '👤', angle: 240, route: 'profile' },
    { name: 'Activities', icon: '📋', angle: 285, route: 'activities' },
    { name: 'Ranks', icon: '🥇', angle: 335, route: 'ranks' },
    { name: 'Challenges', icon: '🎯', angle: 25, route: 'challenges' },
    { name: 'Feed', icon: '📱', angle: 75, route: 'feed' },
    { name: 'Settings', icon: '⚙️', angle: 125, route: 'settings' }
  ];

  // Function to handle clicking on a floating element
  const handleElementClick = (element) => {
    // Navigate to the appropriate screen using the onNavigate prop
    if (element.route === 'ranks') {
      onNavigate('ranks');
    } else if (element.route === 'challenges') {
      onNavigate('challenges');
    } else if (element.route === 'activities') {
      onNavigate('activities');
    } else if (element.route === 'feed') {
        onNavigate('feed');  
    } else if (element.route === 'settings') {
        onNavigate('settings');
    } else if (element.route === 'profile') {
        onNavigate('profile');    
    } else {
      console.log(`Navigating to ${element.route}`);
      // For demonstration purposes, show alert for other screens
      alert(`Navigating to ${element.name} screen`);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 overflow-hidden">
      {/* Floating particles background */}
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
      
      {/* Show avatar selection on initial load or when requested */}
      {showAvatarSelection && (
        <AvatarSelection
          avatarOptions={avatarOptions}
          selectedAvatarIndex={selectedAvatarIndex}
          navigateAvatars={navigateAvatars}
          handleAvatarSelect={handleAvatarSelect}
        />
      )}

      {/* Main Home Screen (visible after avatar selection) */}
      {(!showAvatarSelection && selectedAvatar) && (
        <div className="relative h-full w-full flex flex-col items-center">
          {/* Header */}
          <div className="w-full px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Eco Heroes</h1>
            <div className="flex items-center">
              <div className="text-white mr-2">Level {userData?.level || 1}</div>
              <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-gradient-to-r from-green-500 to-blue-500"></div>
              </div>
            </div>
          </div>

          {/* Avatar display in the center with floating elements */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Orbital path - visible ring around the avatar */}
              <div className="absolute inset-0 rounded-full border border-white/20" style={{ width: '300px', height: '300px', left: '-126px', top: '-126px' }}></div>
              
              {/* Avatar in the center */}
              <div 
                className="w-48 h-48 rounded-full shadow-2xl flex items-center justify-center z-10 relative"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${selectedAvatar.color} 0%, ${getSecondaryColor(selectedAvatar.style)} 100%)`,
                }}
              >
                <RenderAvatar style={selectedAvatar.style} />
              </div>
              
              {/* User name below avatar - moved down by increasing the bottom value */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <h2 className="text-xl font-bold text-white">{userData?.username || selectedAvatar.name}</h2>
                <p className="text-xs text-green-300">ECO HERO</p>
              </div>
              
              {/* Floating menu items positioned ON the orbital path */}
              {floatingElements.map((element, index) => {
                // Using a radius of 150px to position exactly on the orbital path
                const pos = getPositionFromAngle(element.angle, 150);
                return (
                  <div key={index} className="absolute" style={{
                    left: `calc(50% + ${pos.x}px - 20px)`, // Center the button on the calculated point
                    top: `calc(50% + ${pos.y}px - 20px)`,
                    zIndex: 20,
                  }}>
                    {/* Connecting line from button to center - optional */}
                    <div 
                      className="absolute top-1/2 left-1/2 h-px bg-white/10"
                      style={{
                        width: '130px', // Length of the connecting line from orbit to center
                        transformOrigin: '0 0',
                        transform: `rotate(${element.angle + 180}deg)`, // Point toward the center
                      }}
                    ></div>
                    
                    {/* Menu button */}
                    <button
                      onClick={() => handleElementClick(element)}
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-lg 
                               shadow-lg border border-white/30 flex items-center justify-center 
                               transition-all duration-300 hover:scale-110 hover:bg-white/30 
                               group z-10 relative"
                    >
                      <span className="text-2xl">{element.icon}</span>
                      <span className="absolute opacity-0 group-hover:opacity-100 whitespace-nowrap 
                                      text-white text-xs bg-black/60 px-2 py-1 rounded-full 
                                      transform translate-y-12 transition-all duration-300 
                                      pointer-events-none z-20">
                        {element.name}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Change Avatar button */}
          <button 
            onClick={() => setShowAvatarSelection(true)} 
            className="absolute bottom-8 right-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Change Avatar
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;