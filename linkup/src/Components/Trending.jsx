import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Eye, ChevronDown, ChevronUp } from "lucide-react";

const Trending = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const componentRef = useRef(null);
  const itemsRef = useRef([]);

  const trendingTopics = [
    { icon: "🚗", title: "Tariffs delayed for automakers", views: "6,542 readers", trend: "+12%" },
    { icon: "👔", title: "Britannia CEO resigns", views: "3,871 readers", trend: "+28%" },
    { icon: "🏭", title: "Manufacturing activity slows", views: "2,150 readers", trend: "+8%" },
    { icon: "📹", title: "Top videos of the week", views: "1,984 readers", trend: "+15%" },
    { icon: "💻", title: "Tech industry innovation", views: "1,200 readers", trend: "+35%" },
    { icon: "🎮", title: "Gaming trends in 2025", views: "850 readers", trend: "+22%" },
  ];

  const visibleTopics = isExpanded ? trendingTopics : trendingTopics.slice(0, 3);

  useEffect(() => {
    // Animate items on mount
    if (itemsRef.current.length > 0) {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateY(20px)';
          item.style.opacity = '0';
          
          setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
          }, index * 100);
        }
      });
    }
  }, [visibleTopics]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={componentRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #faf5ff, #f3e8ff, #e9d5ff)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.12)',
        border: '1px solid rgba(139, 92, 246, 0.1)'
      }}
    >
      {/* Header with gradient */}
      <div 
        className="relative p-6 border-b border-purple-200/50"
        style={{
          background: 'linear-gradient(135deg, #6b46c1, #8b5cf6, #a855f7)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-xl text-white">Trending Now</h2>
          </div>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <Eye className="w-4 h-4" />
            <span>{trendingTopics.reduce((acc, topic) => acc + parseInt(topic.views.replace(/[^\d]/g, '')), 0).toLocaleString()} total views</span>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white/70 backdrop-blur-sm">
        {visibleTopics.map((topic, index) => (
          <div 
            key={index}
            ref={addToRefs}
            className="group relative p-5 border-b border-purple-100/50 last:border-0 cursor-pointer transition-all duration-500 ease-out hover:bg-white/80"
            style={{
              transform: 'translateY(0)',
              opacity: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-xl">{topic.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 
                    className="font-semibold text-base mb-2 group-hover:text-purple-700 transition-colors duration-300"
                    style={{ color: '#1f2937' }}
                  >
                    {topic.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1" style={{ color: '#6b7280' }}>
                      <Eye className="w-4 h-4" />
                      <span>{topic.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>{topic.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Hover line effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}
      </div>

      {/* Footer with toggle button */}
      <div className="p-5 bg-white/50 backdrop-blur-sm border-t border-purple-100/50">
        <button 
          onClick={handleToggle}
          className="group w-full flex items-center justify-center space-x-2 p-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #6b46c1, #8b5cf6)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.25)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          <div className="transition-transform duration-300 group-hover:scale-110">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        
        <div className="mt-3 text-center text-xs font-medium" style={{ color: '#6b7280' }}>
          Stay updated with the latest trends on LinkUp
        </div>
      </div>
      
      {/* Floating background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none opacity-50"></div>
    </div>
  );
};

export default Trending;