import React, { useState } from "react";

const ActivitiesScreen = ({ userData, onBack }) => {
  const [activeTab, setActiveTab] = useState("recent");
  
  // Sample activities data
  const activities = {
    recent: [
      { id: 1, type: "plastic", amount: 2, points: 4, date: "Today, 2:30 PM", location: "Main Campus Bin" },
      { id: 2, type: "paper", amount: 3, points: 6, date: "Today, 12:15 PM", location: "Library Bin" },
      { id: 3, type: "organic", amount: 1, points: 2, date: "Yesterday, 4:45 PM", location: "Cafeteria Bin" },
      { id: 4, type: "plastic", amount: 1, points: 2, date: "Yesterday, 10:20 AM", location: "Dorm Bin" },
      { id: 5, type: "non-recyclable", amount: 1, points: 1, date: "Mar 10, 3:30 PM", location: "Main Campus Bin" }
    ],
    stats: {
      plastics: { disposed: 27, points: 54, impact: "Saved 2.7kg of plastic from landfill" },
      paper: { disposed: 18, points: 36, impact: "Saved 2 trees worth of paper" },
      organic: { disposed: 14, points: 28, impact: "Created 3kg of compost potential" },
      nonRecyclable: { disposed: 2, points: 2, impact: "Properly disposed of non-recyclable waste" }
    },
    challenges: [
      { id: 1, name: "Plastic Patrol", progress: 27, target: 50, reward: "Plastic Hero Badge" },
      { id: 2, name: "Paper Saver", progress: 18, target: 30, reward: "+20 bonus points" }
    ]
  };
  
  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch(type) {
      case "plastic":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "paper":
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "organic":
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.2 2.1a1 1 0 011.4-.2l1.5 1.2a1 1 0 01.2 1.4L6.5 5.9a1 1 0 01-1.4.2L3.6 5a1 1 0 01-.2-1.4l.8-1.5zM19 4a1 1 0 01-1 1h-8a1 1 0 010-2h8a1 1 0 011 1z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.7 16.1a1 1 0 111.4.2l.8 1.5a1 1 0 01-.2 1.4l-1.5 1.2a1 1 0 01-1.4-.2l-.8-1.5a1 1 0 01.2-1.4l1.5-1.2zM1 16a1 1 0 011-1h8a1 1 0 110 2H2a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
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
        <h1 className="text-xl font-bold text-white">My Activities</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'recent' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent Activities
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'stats' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'challenges' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/70'}`}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges
        </button>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'recent' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-white">Recent Activity</h2>
              <div className="text-xs text-green-300 bg-white/10 px-3 py-1 rounded-full">
                Total Points: {activities.recent.reduce((sum, activity) => sum + activity.points, 0)}
              </div>
            </div>
            
            {activities.recent.map(activity => (
              <div key={activity.id} className="bg-white/10 rounded-lg p-4 flex items-center">
                {getActivityIcon(activity.type)}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white capitalize">{activity.type} Disposal</div>
                    <div className="text-xs text-green-300">+{activity.points} pts</div>
                  </div>
                  <div className="text-sm text-white/70">{activity.date}</div>
                  <div className="text-xs text-white/50 mt-1">{activity.location}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">Impact Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-3xl font-bold text-green-400">{
                    Object.values(activities.stats).reduce((sum, stat) => sum + stat.disposed, 0)
                  }</div>
                  <div className="text-xs text-white">Items Recycled</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-3xl font-bold text-yellow-400">{
                    Object.values(activities.stats).reduce((sum, stat) => sum + stat.points, 0)
                  }</div>
                  <div className="text-xs text-white">Points Earned</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Detailed Stats</h3>
              <div className="space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Plastics</div>
                    <div className="text-sm text-blue-300">{activities.stats.plastics.disposed} items</div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(activities.stats.plastics.disposed / 50) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/70 mt-2">{activities.stats.plastics.impact}</div>
                </div>
                
                <div className="bg-yellow-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Paper</div>
                    <div className="text-sm text-yellow-300">{activities.stats.paper.disposed} items</div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ width: `${(activities.stats.paper.disposed / 30) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/70 mt-2">{activities.stats.paper.impact}</div>
                </div>
                
                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Organic</div>
                    <div className="text-sm text-green-300">{activities.stats.organic.disposed} items</div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(activities.stats.organic.disposed / 30) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/70 mt-2">{activities.stats.organic.impact}</div>
                </div>
                
                <div className="bg-red-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Non-Recyclable</div>
                    <div className="text-sm text-red-300">{activities.stats.nonRecyclable.disposed} items</div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${(activities.stats.nonRecyclable.disposed / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/70 mt-2">{activities.stats.nonRecyclable.impact}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-white">Active Challenges</h2>
              <button className="text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full">
                View All
              </button>
            </div>
            
            {activities.challenges.map(challenge => (
              <div key={challenge.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white">{challenge.name}</div>
                  <div className="text-xs bg-white/10 text-green-300 px-2 py-1 rounded-full">
                    {challenge.progress}/{challenge.target}
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" 
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-white/70">
                    {Math.round((challenge.progress / challenge.target) * 100)}% Complete
                  </div>
                  <div className="text-xs text-yellow-300">Reward: {challenge.reward}</div>
                </div>
              </div>
            ))}
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-3">Completed Challenges</h3>
              <div className="bg-white/5 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">First Week Warrior</div>
                  <div className="text-xs text-white/70">Completed 7 days ago</div>
                </div>
                <div className="ml-auto">
                  <div className="text-xs text-green-300">+30 pts</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesScreen;