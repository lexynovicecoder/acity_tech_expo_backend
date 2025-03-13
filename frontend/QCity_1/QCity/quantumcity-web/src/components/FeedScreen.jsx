import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FeedScreen = ({ onBack, userData }) => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Simulate fetching feed data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchFeeds = async () => {
      setLoading(true);
      
      // Simulated data
      const feedData = [
        {
          id: 1,
          author: 'Eco Council',
          avatar: '🌎',
          timestamp: '2h ago',
          content: 'Did you know? Composting food scraps can reduce your waste by up to 30%! Start your composting journey today with our beginner guide.',
          image: '/eco-compost.jpg',
          topic: 'compost',
          likes: 248,
          comments: 37,
          isVerified: true
        },
        {
          id: 2,
          author: 'Waste Management Inc.',
          avatar: '♻️',
          timestamp: '5h ago',
          content: 'New recycling center opening in Downtown! Drop off your electronics, batteries, and hazardous waste every Saturday from 9am-3pm.',
          topic: 'recycling',
          likes: 156,
          comments: 23,
          isVerified: true
        },
        {
          id: 3,
          author: 'Ocean Guardian',
          avatar: '🌊',
          timestamp: '1d ago',
          content: 'Plastic waste in our oceans affects over 700 marine species. Here are 5 simple ways to reduce your plastic footprint when enjoying the beach this summer.',
          image: '/ocean-plastic.jpg',
          topic: 'plastic',
          likes: 532,
          comments: 87,
          isVerified: true
        },
        {
          id: 4,
          author: 'Urban Gardener',
          avatar: '🌱',
          timestamp: '1d ago',
          content: 'Transform your food waste into nutrient-rich soil for your plants! Our latest video shows how to set up an apartment-friendly worm composting bin.',
          topic: 'compost',
          likes: 189,
          comments: 42,
          isVerified: false
        },
        {
          id: 5,
          author: 'GreenSchool Initiative',
          avatar: '📚',
          timestamp: '2d ago',
          content: 'Our students collected 500kg of recyclables in just one week! Get inspired by how schools can lead the way in waste management education.',
          topic: 'education',
          likes: 302,
          comments: 51,
          isVerified: true
        }
      ];
      
      // Simulate network delay
      setTimeout(() => {
        setFeeds(feedData);
        setLoading(false);
      }, 1000);
    };
    
    fetchFeeds();
  }, []);

  // Filter feed items based on selected topic
  const filteredFeeds = activeFilter === 'all' 
    ? feeds 
    : feeds.filter(feed => feed.topic === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 overflow-hidden flex flex-col">
      {/* Floating particles background (same as HomeScreen) */}
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
      <div className="w-full px-4 py-4 flex justify-between items-center bg-black/10 backdrop-blur-sm z-10">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-white">Eco Feed</h1>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-xs font-bold">
            {userData?.username?.charAt(0) || 'E'}
          </div>
          <div className="text-white text-sm ml-1">{userData?.points || 0} pts</div>
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="w-full overflow-x-auto py-2 px-4 bg-black/5 flex space-x-2 no-scrollbar">
        {['all', 'recycling', 'compost', 'plastic', 'education'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-white/20 text-white font-medium' 
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Feed content */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            className="space-y-4 pb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFeeds.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <p>No posts found for this topic. Check back later!</p>
              </div>
            ) : (
              filteredFeeds.map(feed => (
                <motion.div 
                  key={feed.id}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
                >
                  {/* Feed card header */}
                  <div className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-xl">
                      {feed.avatar}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">{feed.author}</h3>
                        {feed.isVerified && (
                          <span className="ml-1 text-blue-400 text-xs">✓</span>
                        )}
                      </div>
                      <p className="text-white/60 text-xs">{feed.timestamp}</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-white/10 text-xs text-white/80">
                      #{feed.topic}
                    </div>
                  </div>
                  
                  {/* Feed content */}
                  <div className="px-4 pb-3">
                    <p className="text-white leading-relaxed">{feed.content}</p>
                  </div>
                  
                  {/* Image if available */}
                  {feed.image && (
                    <div className="w-full h-56 bg-gray-800 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                        Image: {feed.image.replace('/', '')}
                      </div>
                    </div>
                  )}
                  
                  {/* Interaction buttons */}
                  <div className="px-4 py-3 flex justify-between border-t border-white/10">
                    <button className="flex items-center text-white/70 hover:text-white transition-colors">
                      <span className="mr-1">👍</span> {feed.likes}
                    </button>
                    <button className="flex items-center text-white/70 hover:text-white transition-colors">
                      <span className="mr-1">💬</span> {feed.comments}
                    </button>
                    <button className="flex items-center text-white/70 hover:text-white transition-colors">
                      <span className="mr-1">↗️</span> Share
                    </button>
                    <button className="flex items-center text-white/70 hover:text-white transition-colors">
                      <span className="mr-1">🔖</span> Save
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
      
      {/* Floating action button */}
      <div className="absolute bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          <span className="text-2xl">✏️</span>
        </button>
      </div>
    </div>
  );
};

export default FeedScreen;