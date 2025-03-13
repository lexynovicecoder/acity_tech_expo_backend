import React, { useState } from 'react';
import { RenderAvatar, getSecondaryColor } from './AvatarSelection';

const SettingsScreen = ({ onBack, userData, onUpdateUserData }) => {
  const [username, setUsername] = useState(userData?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  
  // Get the selected avatar from localStorage
  const selectedAvatar = JSON.parse(localStorage.getItem('selectedAvatar')) || {
    name: 'Aqua', 
    style: 'water', 
    color: '#0ea5e9'
  };

  const handleSaveProfile = () => {
    if (username.trim()) {
      if (onUpdateUserData) {
        onUpdateUserData({ ...userData, username });
      }
      alert('Profile updated successfully!');
    } else {
      alert('Username cannot be empty');
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword) {
      alert('Please enter your current password');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // Here you would typically validate the current password
    // and update with the new password on your backend
    
    alert('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      // Clear relevant localStorage items
      localStorage.removeItem('hasSelectedAvatar');
      // Navigate to login page or splash screen
      onBack('splash'); // Assuming your onBack function can take a specific screen
    }
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Eco Heroes',
        text: 'Join me in saving the planet with Eco Heroes!',
        url: 'https://ecoheroes.app', // Replace with your actual app URL
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API not supported in your browser. Copy this link: https://ecoheroes.app');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div 
                className="w-24 h-24 rounded-full shadow-lg flex items-center justify-center mb-4"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${selectedAvatar.color} 0%, ${getSecondaryColor(selectedAvatar.style)} 100%)`,
                }}
              >
                <RenderAvatar style={selectedAvatar.style} size="small" />
              </div>
              <button 
                onClick={() => onBack('home', { showAvatarSelection: true })}
                className="text-sm text-white bg-white/20 px-4 py-1 rounded-full"
              >
                Change Avatar
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Email</label>
                <input
                  type="email"
                  value="user@example.com"
                  disabled
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white opacity-50"
                />
                <p className="text-xs text-white/50 mt-1">Email cannot be changed</p>
              </div>
              
              <button
                onClick={handleSaveProfile}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
              >
                Save Profile
              </button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  placeholder="Confirm new password"
                />
              </div>
              
              <button
                onClick={handleChangePassword}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
              >
                Change Password
              </button>
            </div>
          </div>
        );
        
      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-white">Push Notifications</label>
                <div 
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${notifications ? 'bg-green-500' : 'bg-gray-600'}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notifications ? 'left-7' : 'left-1'}`}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-white">Dark Mode</label>
                <div 
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${darkMode ? 'bg-green-500' : 'bg-gray-600'}`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${darkMode ? 'left-7' : 'left-1'}`}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleShareApp}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-300 mb-4"
                >
                  Share App
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => onBack('home')}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>
      
      {/* Settings Navigation */}
      <div className="flex mb-6 space-x-2 overflow-x-auto pb-2">
        {['profile', 'security', 'preferences'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeSection === section 
                ? 'bg-white/20 font-semibold text-white' 
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Settings Content */}
      <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 text-white max-w-md mx-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default SettingsScreen;