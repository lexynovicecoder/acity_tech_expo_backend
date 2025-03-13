import React, { useState } from "react";

const ChallengesScreen = ({ userData, onBack }) => {
  const [activeTab, setActiveTab] = useState("daily");
  
  // Sample challenges data
  const challengesData = {
    daily: [
      { 
        id: 1, 
        title: "Recycle 3 Items", 
        description: "Take photos of 3 different items you've recycled today", 
        points: 50, 
        progress: 2, 
        total: 3, 
        icon: "recycle",
        completed: false
      },
      { 
        id: 2, 
        title: "Ride Green", 
        description: "Use public transportation or bike instead of a car", 
        points: 75, 
        progress: 1, 
        total: 1, 
        icon: "transport",
        completed: true 
      },
      { 
        id: 3, 
        title: "Water Saver", 
        description: "Take a shower under 5 minutes", 
        points: 30, 
        progress: 0, 
        total: 1, 
        icon: "water",
        completed: false 
      },
      { 
        id: 4, 
        title: "Eco Quiz", 
        description: "Complete today's sustainability quiz", 
        points: 40, 
        progress: 0, 
        total: 1, 
        icon: "quiz",
        completed: false 
      }
    ],
    weekly: [
      { 
        id: 101, 
        title: "Zero Waste Day", 
        description: "Go an entire day without producing trash", 
        points: 150, 
        progress: 0, 
        total: 1, 
        icon: "zerowaste",
        completed: false 
      },
      { 
        id: 102, 
        title: "Plastic Detective", 
        description: "Identify and replace 5 single-use plastics in your home", 
        points: 120, 
        progress: 3, 
        total: 5, 
        icon: "plastic",
        completed: false 
      },
      { 
        id: 103, 
        title: "Energy Audit", 
        description: "Track and reduce your energy usage for 3 days", 
        points: 200, 
        progress: 2, 
        total: 3, 
        icon: "energy",
        completed: false 
      }
    ],
    monthly: [
      { 
        id: 201, 
        title: "Community Cleanup", 
        description: "Participate in a local cleanup event or organize one", 
        points: 500, 
        progress: 0, 
        total: 1, 
        icon: "community", 
        completed: false,
        special: true
      },
      { 
        id: 202, 
        title: "Grow Your Own", 
        description: "Plant and maintain an herb garden or houseplant", 
        points: 350, 
        progress: 1, 
        total: 1, 
        icon: "plant",
        completed: true 
      },
      { 
        id: 203, 
        title: "Eco Influencer", 
        description: "Share 10 eco-tips on social media", 
        points: 300, 
        progress: 4, 
        total: 10, 
        icon: "share",
        completed: false 
      }
    ]
  };
  
  // Get icon based on challenge type
  const getIcon = (iconType) => {
    switch(iconType) {
      case 'recycle':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'transport':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'water':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'zerowaste':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'plastic':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'energy':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'community':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'plant':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'share':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  // Calculate daily progress
  const calculateProgress = (tab) => {
    const challenges = challengesData[tab];
    if (!challenges || challenges.length === 0) return { completed: 0, total: 0, percent: 0 };
    
    const completed = challenges.filter(c => c.completed).length;
    return {
      completed,
      total: challenges.length,
      percent: Math.round((completed / challenges.length) * 100)
    };
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 overflow-hidden">
      {/* Floating particles background - same as other screens */}
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
        <h1 className="text-xl font-bold text-white">Challenges</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'daily' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'weekly' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'monthly' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </button>
      </div>
      
      {/* Progress summary */}
      <div className="bg-white/5 backdrop-blur-sm p-4 border-b border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Your Progress</span>
          <span className="text-white/70 text-sm">
            {calculateProgress(activeTab).completed}/{calculateProgress(activeTab).total} Completed
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
            style={{ width: `${calculateProgress(activeTab).percent}%` }}
          ></div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        {challengesData[activeTab] && challengesData[activeTab].map((challenge) => (
          <div 
            key={challenge.id} 
            className={`mb-4 rounded-lg overflow-hidden border ${challenge.completed ? 'border-green-400/50 bg-green-900/20' : challenge.special ? 'border-yellow-400/50 bg-yellow-900/20' : 'border-white/10 bg-white/5'}`}
          >
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${challenge.completed ? 'bg-green-500' : challenge.special ? 'bg-yellow-500' : 'bg-white/20'} text-white`}>
                  {getIcon(challenge.icon)}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-white flex items-center">
                    {challenge.title}
                    {challenge.special && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-500/30 text-yellow-300">
                        Special
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-white/70">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-400 font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    {challenge.points}
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">Progress</span>
                  <span className="text-white/70">{challenge.progress}/{challenge.total}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${challenge.completed ? 'bg-green-500' : challenge.special ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Action button */}
              <div className="mt-4 flex justify-end">
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    challenge.completed 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                  }`}
                >
                  {challenge.completed ? 'Completed' : 'Take Action'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-white/70">Current Points</span>
            <div className="text-white font-medium">2,756 pts</div>
          </div>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg shadow-green-900/30">
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengesScreen;