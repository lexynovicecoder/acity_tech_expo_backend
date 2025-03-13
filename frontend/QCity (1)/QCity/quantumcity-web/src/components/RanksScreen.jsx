import React, { useState } from "react";

const RanksScreen = ({ userData, onBack }) => {
  const [activeTab, setActiveTab] = useState("global");
  
  // Sample ranks data
  const ranksData = {
    global: [
      { id: 1, rank: 1, username: "EcoMaster", avatar: "RecycleHero", level: 12, points: 3642, isCurrent: false },
      { id: 2, rank: 2, username: "GreenWolf", avatar: "ForestKeeper", level: 10, points: 3128, isCurrent: false },
      { id: 3, rank: 3, username: "OceanGuardian", avatar: "OceanGuardian", level: 9, points: 2940, isCurrent: false },
      { id: 4, rank: 4, username: "RecycleKing", avatar: "EcoWarrior", level: 8, points: 2756, isCurrent: true },
      { id: 5, rank: 5, username: "EarthSaver", avatar: "ForestKeeper", level: 8, points: 2598, isCurrent: false },
      { id: 6, rank: 6, username: "GreenThumb", avatar: "EnergyChampion", level: 7, points: 2342, isCurrent: false },
      { id: 7, rank: 7, username: "EcoRanger", avatar: "EcoWarrior", level: 7, points: 2187, isCurrent: false },
      { id: 8, rank: 8, username: "PlanetHero", avatar: "RecycleHero", level: 6, points: 1950, isCurrent: false },
      { id: 9, rank: 9, username: "WasteWarrior", avatar: "EcoWarrior", level: 6, points: 1845, isCurrent: false },
      { id: 10, rank: 10, username: "RecycleQueen", avatar: "OceanGuardian", level: 5, points: 1690, isCurrent: false }
    ],
    friends: [
      { id: 101, rank: 1, username: "JaneEco", avatar: "OceanGuardian", level: 7, points: 2140, isCurrent: false },
      { id: 102, rank: 2, username: "RecycleKing", avatar: "EcoWarrior", level: 8, points: 2756, isCurrent: true },
      { id: 103, rank: 3, username: "GreenLantern", avatar: "ForestKeeper", level: 6, points: 1920, isCurrent: false },
      { id: 104, rank: 4, username: "BinMaster", avatar: "RecycleHero", level: 5, points: 1650, isCurrent: false },
      { id: 105, rank: 5, username: "EarthFirst", avatar: "EnergyChampion", level: 5, points: 1590, isCurrent: false }
    ],
    weekly: [
      { id: 201, rank: 1, username: "BinMaster", avatar: "RecycleHero", level: 5, points: 320, isCurrent: false },
      { id: 202, rank: 2, username: "GreenThumb", avatar: "EnergyChampion", level: 7, points: 290, isCurrent: false },
      { id: 203, rank: 3, username: "JaneEco", avatar: "OceanGuardian", level: 7, points: 275, isCurrent: false },
      { id: 204, rank: 4, username: "RecycleKing", avatar: "EcoWarrior", level: 8, points: 220, isCurrent: true },
      { id: 205, rank: 5, username: "EarthFirst", avatar: "EnergyChampion", level: 5, points: 190, isCurrent: false }
    ]
  };
  
  // Get avatar color based on avatar type
  const getAvatarColor = (avatarType) => {
    switch(avatarType) {
      case 'EcoWarrior': return 'from-green-500 to-blue-500';
      case 'OceanGuardian': return 'from-blue-400 to-blue-600';
      case 'ForestKeeper': return 'from-green-400 to-green-700';
      case 'EnergyChampion': return 'from-yellow-400 to-orange-500';
      case 'RecycleHero': return 'from-red-400 to-purple-600';
      default: return 'from-green-500 to-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 overflow-hidden">
      {/* Floating particles background - same as home screen */}
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
      
      {/* Header */}
      <div className="relative z-10 flex items-center p-4 border-b border-white/10">
        <button 
          onClick={onBack}
          className="mr-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white">Leaderboard</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'global' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('global')}
        >
          Global
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'friends' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'weekly' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly
        </button>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Top 3 Podium */}
        <div className="pt-8 pb-6 px-4 flex items-end justify-center space-x-4">
          {activeTab !== 'empty' && ranksData[activeTab].slice(0, 3).map((user, index) => {
            // Determine podium position
            const position = index + 1;
            const size = position === 1 ? 'h-28' : position === 2 ? 'h-24' : 'h-20';
            const order = position === 1 ? 'order-2' : position === 2 ? 'order-1' : 'order-3';
            
            return (
              <div key={user.id} className={`flex flex-col items-center ${order}`}>
                {/* Crown for first place */}
                {position === 1 && (
                  <svg className="w-8 h-8 text-yellow-400 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                )}
                
                {/* Avatar */}
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${getAvatarColor(user.avatar)} ${user.isCurrent ? 'ring-2 ring-white' : ''}`}
                >
                  <span className="text-white font-bold text-lg">{user.username.charAt(0)}</span>
                </div>
                
                {/* Username and Points */}
                <div className="text-center mt-2">
                  <div className={`text-sm font-medium ${user.isCurrent ? 'text-green-300' : 'text-white'}`}>{user.username}</div>
                  <div className="text-xs text-white/70">Lvl {user.level} • {user.points} pts</div>
                </div>
                
                {/* Podium */}
                <div className={`${size} w-20 bg-gradient-to-t from-emerald-800 to-emerald-600 rounded-t-lg mt-2 flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">#{position}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Leaderboard List */}
        <div className="px-4 pb-4">
          {/* List header */}
          <div className="flex items-center py-2 px-3 text-xs text-white/60 border-b border-white/10">
            <div className="w-10 text-center">Rank</div>
            <div className="flex-1 ml-2">Player</div>
            <div className="w-16 text-center">Level</div>
            <div className="w-20 text-right">Points</div>
          </div>
          
          {/* List items */}
          {activeTab !== 'empty' && ranksData[activeTab].map((user, index) => (
            <div 
              key={user.id} 
              className={`flex items-center py-3 px-3 ${user.isCurrent ? 'bg-white/10 rounded-lg my-2' : index !== ranksData[activeTab].length - 1 ? 'border-b border-white/10' : ''}`}
            >
              {/* Rank */}
              <div className="w-10 text-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${index < 3 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-white/20'} text-white text-xs font-medium`}>
                  {user.rank}
                </span>
              </div>
              
              {/* User info */}
              <div className="flex-1 flex items-center ml-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${getAvatarColor(user.avatar)}`}
                >
                  <span className="text-white font-bold text-sm">{user.username.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${user.isCurrent ? 'text-green-300' : 'text-white'}`}>{user.username}</div>
                </div>
              </div>
              
              {/* Level */}
              <div className="w-16 text-center">
                <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-white/10 text-white text-xs">
                  Lvl {user.level}
                </span>
              </div>
              
              {/* Points */}
              <div className="w-20 text-right text-sm font-medium text-white">
                {user.points}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* User's current rank - footer */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        {activeTab !== 'empty' && ranksData[activeTab].map(user => {
          if (user.isCurrent) {
            return (
              <div key={`current-${user.id}`} className="flex items-center p-4">
                <div className="w-10 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                    {user.rank}
                  </span>
                </div>
                
                <div className="flex-1 flex items-center ml-2">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${getAvatarColor(user.avatar)} ring-2 ring-green-400`}
                  >
                    <span className="text-white font-bold text-base">{user.username.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">You</div>
                    <div className="text-xs text-white/70">Lvl {user.level} • {user.points} pts</div>
                  </div>
                </div>
                
                {activeTab === 'global' && (
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-white/70">Next rank</span>
                    <span className="text-sm font-medium text-white">{user.rank > 1 ? ranksData[activeTab][user.rank - 2].points - user.points : 0} pts</span>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default RanksScreen;