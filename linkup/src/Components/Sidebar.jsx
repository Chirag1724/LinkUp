import React, { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const profileCardRef = useRef(null);
  const statsRef = useRef(null);
  const itemsRef = useRef(null);
  const profileImageRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // CSS variables for the color theme
  const cssVariables = {
    '--primary-purple': '#6b46c1',
    '--secondary-purple': '#8b5cf6',
    '--light-purple': '#a855f7',
    '--success-green': '#10b981',
    '--light-green': '#34d399',
    '--warning-orange': '#f59e0b',
    '--bg-ultra-light': '#faf5ff',
    '--bg-light-purple': '#f3e8ff',
    '--bg-white': '#ffffff',
    '--text-primary': '#1f2937',
    '--text-secondary': '#4b5563',
    '--text-muted': '#6b7280',
    '--gradient-header': 'linear-gradient(135deg, #6b46c1, #8b5cf6, #a855f7)',
    '--gradient-background': 'linear-gradient(135deg, #faf5ff, #f3e8ff, #e9d5ff)',
    '--gradient-success': 'linear-gradient(135deg, #10b981, #34d399)',
    '--shadow-purple': '0 8px 32px rgba(139, 92, 246, 0.12)',
    '--shadow-hover': '0 20px 40px rgba(139, 92, 246, 0.2)'
  };

  useEffect(() => {
    // Simple animation without GSAP
    const sidebar = sidebarRef.current;
    const profileCard = profileCardRef.current;
    const stats = statsRef.current;
    const items = itemsRef.current;

    if (sidebar && profileCard && stats && items) {
      // Trigger animations
      setTimeout(() => {
        setIsAnimated(true);
      }, 100);

      // Add hover effects
      const statItems = stats.querySelectorAll('.stat-item');
      const menuItems = items.querySelectorAll('.menu-item');

      statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateX(5px)';
          item.style.backgroundColor = 'var(--bg-light-purple)';
        });
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateX(0)';
          item.style.backgroundColor = 'transparent';
        });
      });

      menuItems.forEach(item => {
        const icon = item.querySelector('.menu-icon');
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateX(8px)';
          item.style.backgroundColor = 'var(--bg-light-purple)';
          if (icon) {
            icon.style.transform = 'rotate(5deg) scale(1.1)';
          }
        });
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateX(0)';
          item.style.backgroundColor = 'transparent';
          if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
          }
        });
      });
    }
  }, []);

  const menuItems = [
    { icon: "📑", label: "Saved posts", count: "12" },
    { icon: "👥", label: "My network", count: "1.2k" },
    { icon: "🎯", label: "Tech Talks", count: "8", isNew: true },
    { icon: "🎪", label: "Event Hub", count: "15" },
    { icon: "🎓", label: "Alumni Connect", count: "245" },
    { icon: "📅", label: "Events", count: "3" },
    { icon: "👥", label: "Groups", count: "7" }
  ];

  return (
    <div style={cssVariables}>
      <div 
        ref={sidebarRef}
        className={`space-y-6 min-h-screen transition-all duration-800 ${
          isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
        style={{
          background: 'var(--gradient-background)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced Profile Card */}
        <div 
          ref={profileCardRef}
          className={`bg-white rounded-2xl overflow-hidden relative transition-all duration-600 ${
            isAnimated ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{
            boxShadow: 'var(--shadow-purple)',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            transitionDelay: '200ms'
          }}
        >
          {/* Gradient Header with Pattern */}
          <div 
            className="h-20 relative overflow-hidden"
            style={{ background: 'var(--gradient-header)' }}
          >
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 right-4 w-12 h-12 rounded-full border-2 border-white"></div>
              <div className="absolute top-6 right-12 w-6 h-6 rounded-full bg-white opacity-30"></div>
              <div className="absolute bottom-3 left-6 w-8 h-8 rounded-full border border-white"></div>
            </div>
            
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Online</span>
            </div>
          </div>
          
          <div className="relative px-6 pb-6">
            {/* Enhanced Profile Image */}
            <div className="relative flex justify-center">
              <div
                ref={profileImageRef}
                className={`w-28 h-28 rounded-full border-4 border-white absolute -top-14 cursor-pointer transition-all duration-500 hover:scale-105 ${
                  isAnimated ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-80 -rotate-10'
                }`}
                style={{
                  background: 'var(--gradient-header)',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                  transitionDelay: '400ms'
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center overflow-hidden">
  <img 
    src="./photo.jpg" 
    alt="Profile"
    className="w-full h-full object-cover rounded-full"
  />
</div>

              </div>
              {/* Verification Badge */}
              <div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 translate-x-8 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'var(--success-green)' }}
              >
                ✓
              </div>
            </div>
            
            {/* Enhanced Profile Info */}
            <div className="mt-16 text-center">
              <h2 
                className="font-bold text-xl mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Chirag Dwivedi
              </h2>
              <p 
                className="text-sm mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Front End Developer | MERN Stack
              </p>
              <div className="flex justify-center items-center space-x-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full text-white" style={{ background: 'var(--primary-purple)' }}>
                  Pro Member
                </span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--bg-light-purple)', color: 'var(--primary-purple)' }}>
                  Level 5
                </span>
              </div>
            </div>
            
            {/* Enhanced Profile Stats */}
            <div 
              ref={statsRef}
              className="border-t border-b py-4 space-y-2"
              style={{ borderColor: 'rgba(139, 92, 246, 0.1)' }}
            >
              {[
                { label: "Profile viewers", value: "92", change: "+12%" },
                { label: "Post impressions", value: "1.3k", change: "+45%" },
                { label: "Connections", value: "847", change: "+8%" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`stat-item flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold" style={{ color: 'var(--primary-purple)' }}>
                      {stat.value}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--success-green)' }}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Menu Items */}
            <div className="mt-6">
              <h3 className="font-semibold text-sm mb-4 flex items-center" style={{ color: 'var(--text-primary)' }}>
                <span className="mr-2">⚡</span>
                Quick Access
              </h3>
              <ul ref={itemsRef} className="space-y-1">
                {menuItems.map((item, index) => (
                  <li 
                    key={index}
                    className={`menu-item text-sm flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all duration-300 group ${
                      isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{
                      transitionDelay: `${900 + index * 80}ms`
                    }}
                  >
                    <div className="flex items-center">
                      <span className="menu-icon mr-3 text-base transition-transform duration-300">{item.icon}</span>
                      <span 
                        style={{ color: 'var(--text-secondary)' }} 
                        className="group-hover:text-purple-600 transition-colors duration-300"
                      >
                        {item.label}
                      </span>
                      {item.isNew && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ 
                            background: 'rgba(245, 158, 11, 0.1)', 
                            color: 'var(--warning-orange)' 
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--primary-purple)' }}>
                      {item.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Action Button */}
            <div className="mt-6">
              <button 
                className="w-full py-3 px-4 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                style={{ 
                  background: 'var(--gradient-header)',
                  boxShadow: 'var(--shadow-purple)'
                }}
              >
                🚀 Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Widget */}
        <div 
          className={`bg-white rounded-2xl p-6 relative overflow-hidden transition-all duration-600 ${
            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            boxShadow: 'var(--shadow-purple)',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            transitionDelay: '1200ms'
          }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-10" style={{ background: 'var(--gradient-header)' }}></div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            🎯 Today's Goals
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Connect with 5 people</span>
              <span className="text-xs font-medium" style={{ color: 'var(--success-green)' }}>3/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-1000" 
                style={{ 
                  width: isAnimated ? '60%' : '0%', 
                  background: 'var(--gradient-success)',
                  transitionDelay: '1400ms'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;