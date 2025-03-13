import React, { useState } from "react";

const CollaboratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sample data for dashboard
  const pickupRequests = [
    { id: "REQ-001", location: "Accra Central", binType: "Plastics", fillLevel: 92, timestamp: "2025-03-11T14:30:00" },
    { id: "REQ-002", location: "Tema Industrial", binType: "Metals", fillLevel: 95, timestamp: "2025-03-11T15:45:00" },
    { id: "REQ-003", location: "Labadi Beach", binType: "Plastics", fillLevel: 90, timestamp: "2025-03-11T16:20:00" },
    { id: "REQ-004", location: "University of Ghana", binType: "Paper", fillLevel: 91, timestamp: "2025-03-11T17:10:00" }
  ];
  
  const recyclingMetrics = {
    weeklyCollection: {
      plastics: 420,
      metals: 280,
      paper: 350,
      organics: 520,
      nonRecyclables: 190
    },
    monthlyRevenue: 4250,
    co2Reduced: 5.2,
    nextPickupRoute: "Accra Central → Tema Industrial → Labadi Beach"
  };
  
  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GH', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Get appropriate color for fill level
  const getFillLevelColor = (level) => {
    if (level > 90) return "text-red-500";
    if (level > 70) return "text-yellow-500";
    return "text-green-500";
  };
  
  return (
    <div 
      className="min-h-screen bg-gradient-animate overflow-x-hidden relative"
      style={{
        backgroundImage: "linear-gradient(135deg, #065f46 0%, #0c4a6e 50%, #312e81 100%)",
        backgroundSize: "200% 200%",
        backgroundPosition: "50% 50%"
      }}
    >
      {/* Floating particles background with constrained positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 95}%`, // Constrain to avoid overflow
              top: `${Math.random() * 95}%`,  // Constrain to avoid overflow
              backgroundColor: `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, 0.4)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-md border-b border-white/10 py-3 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <span className="text-xl sm:text-2xl font-bold text-white">
              <span className="text-blue-400">Q</span>
              <span>BIN</span>
            </span>
            <span className="ml-3 text-blue-200 text-base sm:text-lg font-medium">Collaborator Portal</span>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-center sm:text-right">
              <p className="text-blue-200 text-sm">Welcome back,</p>
              <p className="text-white font-medium text-sm sm:text-base">Nelplast Recycling</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/30 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content with improved padding for small screens */}
      <main className="container mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-6">
        {/* Mobile Navigation Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full bg-white/10 text-white py-2 px-3 rounded-lg flex justify-between items-center"
          >
            <span>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <button 
                onClick={() => {setActiveTab("dashboard"); setMobileMenuOpen(false);}} 
                className={`w-full py-2 px-3 text-left ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "text-blue-200"}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => {setActiveTab("pickups"); setMobileMenuOpen(false);}} 
                className={`w-full py-2 px-3 text-left ${activeTab === "pickups" ? "bg-blue-600 text-white" : "text-blue-200"}`}
              >
                Pickup Requests
              </button>
              <button 
                onClick={() => {setActiveTab("analytics"); setMobileMenuOpen(false);}} 
                className={`w-full py-2 px-3 text-left ${activeTab === "analytics" ? "bg-blue-600 text-white" : "text-blue-200"}`}
              >
                Analytics
              </button>
              <button 
                onClick={() => {setActiveTab("settings"); setMobileMenuOpen(false);}} 
                className={`w-full py-2 px-3 text-left ${activeTab === "settings" ? "bg-blue-600 text-white" : "text-blue-200"}`}
              >
                Settings
              </button>
            </div>
          )}
        </div>
        
        {/* Desktop Navigation Tabs */}
        <div className="hidden md:block mb-6">
          <div className="flex bg-white/5 backdrop-blur-sm rounded-lg p-1 max-w-xl mx-auto">
            <button 
              onClick={() => setActiveTab("dashboard")} 
              className={`flex-1 py-2 px-3 rounded-md text-center transition text-sm sm:text-base ${activeTab === "dashboard" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200 hover:bg-white/10"}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("pickups")} 
              className={`flex-1 py-2 px-3 rounded-md text-center transition text-sm sm:text-base ${activeTab === "pickups" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200 hover:bg-white/10"}`}
            >
              Pickup Requests
            </button>
            <button 
              onClick={() => setActiveTab("analytics")} 
              className={`flex-1 py-2 px-3 rounded-md text-center transition text-sm sm:text-base ${activeTab === "analytics" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200 hover:bg-white/10"}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab("settings")} 
              className={`flex-1 py-2 px-3 rounded-md text-center transition text-sm sm:text-base ${activeTab === "settings" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200 hover:bg-white/10"}`}
            >
              Settings
            </button>
          </div>
        </div>
        
        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Revenue Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-blue-100 font-medium text-sm sm:text-base">Monthly Revenue</h3>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">₵{recyclingMetrics.monthlyRevenue.toLocaleString()}</h2>
                <p className="text-green-400 flex items-center text-xs sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  12% increase from last month
                </p>
              </div>
              
              {/* Environmental Impact Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-blue-100 font-medium text-sm sm:text-base">CO₂ Emissions Reduced</h3>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{recyclingMetrics.co2Reduced} tons</h2>
                <p className="text-emerald-400 flex items-center text-xs sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Equivalent to planting 83 trees
                </p>
              </div>
              
              {/* Next Pickup Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-blue-100 font-medium text-sm sm:text-base">Next Pickup Route</h3>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white mb-2 break-words">{recyclingMetrics.nextPickupRoute}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Today, 2:30 PM
                  </span>
                  <span className="text-blue-200 text-xs sm:text-sm">3 locations • 8.5km</span>
                </div>
              </div>
            </div>
            
            {/* Urgent Pickup Requests - Improved responsiveness */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4 mb-4 sm:mb-6">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3">Urgent Pickup Requests</h3>
              
              {/* Desktop table with proper overflow handling */}
              <div className="relative overflow-x-auto rounded-lg hidden sm:block">
                <table className="w-full text-left">
                  <thead className="text-xs sm:text-sm text-blue-200">
                    <tr className="border-b border-white/10">
                      <th className="px-3 py-2">Request ID</th>
                      <th className="px-3 py-2 hidden sm:table-cell">Location</th>
                      <th className="px-3 py-2">Bin Type</th>
                      <th className="px-3 py-2">Fill Level</th>
                      <th className="px-3 py-2 hidden md:table-cell">Timestamp</th>
                      <th className="px-3 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickupRequests.map(request => (
                      <tr key={request.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-3 py-2 text-white text-sm">{request.id}</td>
                        <td className="px-3 py-2 text-white text-sm hidden sm:table-cell">{request.location}</td>
                        <td className="px-3 py-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                            ${request.binType === "Plastics" ? "bg-green-100 text-green-800" : 
                            request.binType === "Metals" ? "bg-blue-100 text-blue-800" : 
                            request.binType === "Paper" ? "bg-yellow-100 text-yellow-800" : 
                            request.binType === "Organics" ? "bg-emerald-100 text-emerald-800" : 
                            "bg-gray-100 text-gray-800"}`}
                          >
                            {request.binType}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`${getFillLevelColor(request.fillLevel)} font-medium text-sm`}>{request.fillLevel}%</span>
                        </td>
                        <td className="px-3 py-2 text-blue-200 text-sm hidden md:table-cell">{formatDate(request.timestamp)}</td>
                        <td className="px-3 py-2 text-right">
                          <button className="px-2 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 transition">
                            Accept
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile-only card view for better small screen experience */}
              <div className="sm:hidden mt-3 space-y-3">
                {pickupRequests.map(request => (
                  <div key={`mobile-${request.id}`} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-medium text-sm">{request.id}</p>
                        <p className="text-blue-200 text-xs">{request.location}</p>
                      </div>
                      <span className={`${getFillLevelColor(request.fillLevel)} font-medium text-sm`}>{request.fillLevel}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                          ${request.binType === "Plastics" ? "bg-green-100 text-green-800" : 
                          request.binType === "Metals" ? "bg-blue-100 text-blue-800" : 
                          request.binType === "Paper" ? "bg-yellow-100 text-yellow-800" : 
                          request.binType === "Organics" ? "bg-emerald-100 text-emerald-800" : 
                          "bg-gray-100 text-gray-800"}`}
                        >
                          {request.binType}
                        </span>
                        <span className="text-blue-200 text-xs">{formatDate(request.timestamp)}</span>
                      </div>
                      <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition">
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weekly Collection Stats - More responsive grid */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3">Weekly Collection Stats (kg)</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-3 border border-green-500/30">
                  <h4 className="text-green-300 text-xs sm:text-sm font-medium mb-1">Plastics</h4>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{recyclingMetrics.weeklyCollection.plastics} kg</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-3 border border-blue-500/30">
                  <h4 className="text-blue-300 text-xs sm:text-sm font-medium mb-1">Metals</h4>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{recyclingMetrics.weeklyCollection.metals} kg</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-3 border border-yellow-500/30">
                  <h4 className="text-yellow-300 text-xs sm:text-sm font-medium mb-1">Paper</h4>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{recyclingMetrics.weeklyCollection.paper} kg</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg p-3 border border-emerald-500/30">
                  <h4 className="text-emerald-300 text-xs sm:text-sm font-medium mb-1">Organics</h4>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{recyclingMetrics.weeklyCollection.organics} kg</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-lg p-3 border border-gray-500/30">
                  <h4 className="text-gray-300 text-xs sm:text-sm font-medium mb-1">Non-Recyclables</h4>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{recyclingMetrics.weeklyCollection.nonRecyclables} kg</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Pickup Requests Content */}
        {activeTab === "pickups" && (
          <div className="animate-fade-in bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-3">All Pickup Requests</h2>
            <p className="text-blue-200 text-sm mb-4 sm:mb-6">This page will contain a comprehensive list of all pickup requests with filtering options.</p>
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-white mb-2">Pickup Management System</h3>
              <p className="text-blue-200 text-sm max-w-md mx-auto">Full pickup management interface will be implemented here with maps, sorting, and filtering options.</p>
            </div>
          </div>
        )}
        
        {/* Analytics Content */}
        {activeTab === "analytics" && (
          <div className="animate-fade-in bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-3">Analytics & Reports</h2>
            <p className="text-blue-200 text-sm mb-4 sm:mb-6">Advanced analytics and reporting tools will be available here.</p>
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-500/20 rounded-full mx-auto flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-white mb-2">Analytics Dashboard</h3>
              <p className="text-blue-200 text-sm max-w-md mx-auto">Charts, trends, and comprehensive analytics will be displayed here for data-driven decision making.</p>
            </div>
          </div>
        )}
        
        {/* Settings Content */}
        {activeTab === "settings" && (
          <div className="animate-fade-in bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-3 sm:p-4">
           <h2 className="text-white font-semibold text-lg sm:text-xl mb-3">Settings</h2>
            <p className="text-blue-200 text-sm mb-4 sm:mb-6">Configure your account and notification preferences here.</p>
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-500/20 rounded-full mx-auto flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-white mb-2">Account Settings</h3>
              <p className="text-blue-200 text-sm max-w-md mx-auto">Update your profile, notification preferences, and account details here.</p>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-md border-t border-white/10 py-3 px-3 sm:px-4 mt-auto">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-blue-200 text-xs sm:text-sm">© 2025 QBIN Waste Management System | Powered by sustainable technology</p>
        </div>
      </footer>
    </div>
  );
};

export default CollaboratorDashboard;