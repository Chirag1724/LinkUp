import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, Settings, Bell, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Default user profile
  const [userProfile] = useState({
    name: "Chirag Dwivedi",
    email: "chirag.dwivedi@gmail.com",
    avatar: null
  });

  useEffect(() => {
    // Scroll handler for navbar shadow
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize entrance animations
    const timer = setTimeout(() => {
      animateEntrance();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const animateEntrance = () => {
    if (navRef.current) {
      navRef.current.style.transform = 'translateY(-100px)';
      navRef.current.style.opacity = '0';
      
      setTimeout(() => {
        navRef.current.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        navRef.current.style.transform = 'translateY(0)';
        navRef.current.style.opacity = '1';
      }, 100);
    }

    if (logoRef.current) {
      logoRef.current.style.transform = 'scale(0.8) rotate(-10deg)';
      setTimeout(() => {
        logoRef.current.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        logoRef.current.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    }

    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        item.style.transform = 'translateY(-20px)';
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          item.style.transform = 'translateY(0)';
          item.style.opacity = '1';
        }, 400 + index * 80);
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // You can add any logout logic here (clear localStorage, etc.)
    navigate("/");
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const navItems = [
    { path: "/internship", label: "Internships", icon: "💼" },
    { path: "/alumini", label: "Alumni Connect", icon: "🤝" },
    { path: "/events", label: "Event Hub", icon: "🎯" },
    { path: "/techtalks", label: "TechTalks", icon: "💡" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled 
            ? 'shadow-lg border-b border-gray-100' 
            : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* Logo Section */}
            <div className="flex items-center group cursor-pointer" onClick={() => handleNavClick("/person")}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <img src="./logo.jpg" alt="My Logo" className="w-8 h-8 object-contain"/>
                  </div>
              <div className="ml-3 hidden sm:block">
                <span className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
                  LinkUp
                </span>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Connect & Grow
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  ref={el => menuItemsRef.current[index] = el}
                  className="relative px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative user-dropdown">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <img 
    src="./photo.jpg" 
    alt="Profile"
    className="w-full h-full object-cover rounded-full"
  />
                  </div>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{userProfile.name}</div>
                      <div className="text-sm text-gray-500">{userProfile.email}</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        handleNavClick("/profile");
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <User size={16} />
                      <span>View Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        handleNavClick("/settings");
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            ref={mobileMenuRef}
            className={`lg:hidden overflow-hidden transition-all duration-400 ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 space-y-2 border-t border-gray-100">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    handleNavClick(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 w-full text-left"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Mobile User Profile */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{userProfile.name}</div>
                    <div className="text-sm text-gray-500">{userProfile.email}</div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleNavClick("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <User size={16} />
                  <span>View Profile</span>
                </button>
                
                <button
                  onClick={() => {
                    handleNavClick("/settings");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-18"></div>
    </>
  );
};

export default Navbar;