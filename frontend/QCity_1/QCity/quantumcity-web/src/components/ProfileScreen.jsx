import React, { useState } from 'react';
import { RenderAvatar, getSecondaryColor } from './AvatarSelection';

const ProfileScreen = ({ userData, onBack, onUpdateUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(userData?.username || '');
  const [editedBio, setEditedBio] = useState(userData?.bio || 'Eco Hero on a mission to save the planet, one sustainable action at a time!');
  
  // Retrieved from localStorage for consistency with HomeScreen
  const selectedAvatar = JSON.parse(localStorage.getItem('selectedAvatar')) || {
    name: 'Aqua',
    style: 'water',
    color: '#0ea5e9'
  };
  
  // Stats data
  const stats = [
    { name: 'Trees Planted', value: userData?.treesPlanted || 12, icon: '🌳' },
    { name: 'Waste Recycled', value: `${userData?.wasteRecycled || 45}kg`, icon: '♻️' },
    { name: 'Water Saved', value: `${userData?.waterSaved || 120}L`, icon: '💧' },
    { name: 'CO₂ Reduced', value: `${userData?.co2Reduced || 78}kg`, icon: '🌿' },
  ];
  
  // Activity badges
  const badges = [
    { name: 'First Recycle', icon: '🥇', unlocked: true },
    { name: 'Tree Planter', icon: '🌳', unlocked: true },
    { name: 'Water Guardian', icon: '💧', unlocked: true },
    { name: 'Energy Saver', icon: '⚡', unlocked: false },
    { name: 'Wildlife Protector', icon: '🦊', unlocked: false },
    { name: 'Eco Influencer', icon: '👑', unlocked: false },
  ];
  
  const handleSaveProfile = () => {
    onUpdateUserData({
      ...userData,
      username: editedUsername,
      bio: editedBio
    });
    setIsEditing(false);
  };
  
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 overflow-auto">
      {/* Header with back button */}
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center"
        >
          <span className="text-white text-xl">←</span>
        </button>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <div className="w-10 h-10"></div> {/* Empty div for symmetry */}
      </div>
      
      {/* Main content */}
      <div className="px-4 pb-20">
        {/* Profile header section */}
        <div className="flex flex-col items-center mt-4 mb-8">
          {/* Avatar */}
          <div 
            className="w-32 h-32 rounded-full shadow-xl flex items-center justify-center z-10 relative mb-4"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${selectedAvatar.color} 0%, ${getSecondaryColor(selectedAvatar.style)} 100%)`,
            }}
          >
            <RenderAvatar style={selectedAvatar.style} />
          </div>
          
          {/* Username and Level */}
          {isEditing ? (
            <div className="w-full max-w-xs">
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="w-full text-center px-4 py-2 mt-2 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="Username"
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-white">{userData?.username || 'RecycleKing'}</h2>
          )}
          
          <div className="flex items-center mt-1 mb-2">
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-300 font-medium">
              Level {userData?.level || 1}
            </span>
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300 font-medium ml-2">
              {userData?.points || 0} Points
            </span>
          </div>
          
          {/* Bio */}
          {isEditing ? (
            <div className="w-full max-w-xs">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full text-center px-4 py-2 mt-2 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
                placeholder="Bio"
                rows={3}
              />
              <button
                onClick={handleSaveProfile}
                className="w-full mt-3 px-4 py-2 bg-green-600/70 backdrop-blur-md rounded-lg text-white font-medium hover:bg-green-600/90 transition-all duration-300"
              >
                Save Profile
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-white/80 text-center max-w-xs">
                {editedBio}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        
        {/* Stats section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-3 px-2">Impact Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{stat.icon}</span>
                  <div>
                    <p className="text-white/70 text-sm">{stat.name}</p>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Badges section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-3 px-2">Achievement Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <div 
                key={index} 
                className={`bg-white/10 backdrop-blur-md rounded-xl p-3 border flex flex-col items-center ${
                  badge.unlocked ? 'border-yellow-400/50' : 'border-white/10 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-1 ${
                  badge.unlocked ? 'bg-yellow-400/20' : 'bg-white/5'
                }`}>
                  {badge.icon}
                </div>
                <p className="text-white text-center text-xs">{badge.name}</p>
                {!badge.unlocked && (
                  <span className="text-white/50 text-xs">Locked</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent activities section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 px-2">Recent Activities</h3>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
            {[
              { icon: '♻️', action: 'Recycled 2kg of plastic', date: '2 days ago', points: '+15' },
              { icon: '🚿', action: 'Saved 20L of water', date: '4 days ago', points: '+10' },
              { icon: '🌳', action: 'Planted a tree', date: '1 week ago', points: '+50' },
              { icon: '🚶', action: 'Walked instead of driving', date: '1 week ago', points: '+5' },
            ].map((activity, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index < 3 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl mr-3">
                    {activity.icon}
                  </span>
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-white/60 text-xs">{activity.date}</p>
                  </div>
                </div>
                <span className="text-green-400 font-medium">{activity.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;