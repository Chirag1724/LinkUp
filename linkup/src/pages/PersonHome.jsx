import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Feed from "../Components/Feed";
import Trending from "../Components/Trending";

const LandingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    if (typeof window !== 'undefined') {
      // Add smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Add entrance animations
      const timeline = {
        from: (elements, props) => {
          elements.forEach((el, index) => {
            if (el) {
              el.style.opacity = '0';
              el.style.transform = 'translateY(30px)';
              el.style.transition = 'all 0.6s ease-out';
              
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, index * 150);
            }
          });
        }
      };

      // Animate components on load
      const components = [
        document.querySelector('.sidebar-container'),
        document.querySelector('.feed-container'),
        document.querySelector('.trending-container')
      ];
      
      timeline.from(components, {});
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #faf5ff, #f3e8ff, #e9d5ff)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      {/* CSS Variables for your color theme */}
      <style jsx>{`
        :root {
          /* Primary Colors */
          --primary-purple: #6b46c1;
          --secondary-purple: #8b5cf6;
          --light-purple: #a855f7;
          
          /* Accent Colors */
          --success-green: #10b981;
          --light-green: #34d399;
          --warning-orange: #f59e0b;
          
          /* Background Colors */
          --bg-ultra-light: #faf5ff;
          --bg-light-purple: #f3e8ff;
          --bg-white: #ffffff;
          
          /* Text Colors */
          --text-primary: #1f2937;
          --text-secondary: #4b5563;
          --text-muted: #6b7280;
          
          /* Gradients */
          --gradient-header: linear-gradient(135deg, #6b46c1, #8b5cf6, #a855f7);
          --gradient-background: linear-gradient(135deg, #faf5ff, #f3e8ff, #e9d5ff);
          --gradient-success: linear-gradient(135deg, #10b981, #34d399);
          
          /* Shadows */
          --shadow-purple: 0 8px 32px rgba(139, 92, 246, 0.12);
          --shadow-hover: 0 20px 40px rgba(139, 92, 246, 0.2);
        }

        /* Enhanced styling for your existing components */
        .sidebar-container {
          transition: all 0.3s ease;
        }

        .feed-container {
          transition: all 0.3s ease;
        }

        .trending-container {
          transition: all 0.3s ease;
        }

        /* Global component styling */
        .component-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: var(--shadow-purple);
          transition: all 0.3s ease;
        }

        .component-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-light-purple);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--gradient-header);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--secondary-purple);
        }

        /* Gradient text effect */
        .gradient-text {
          background: var(--gradient-header);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Professional button styling */
        .professional-button {
          background: var(--gradient-header);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-purple);
        }

        .professional-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        /* Success button styling */
        .success-button {
          background: var(--gradient-success);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.12);
        }

        .success-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
        }

        /* Warning button styling */
        .warning-button {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.12);
        }

        .warning-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.2);
        }

        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        /* Pulse animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Glassmorphism effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: var(--shadow-purple);
        }

        /* Professional card styling */
        .professional-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          box-shadow: var(--shadow-purple);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .professional-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-header);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .professional-card:hover::before {
          opacity: 1;
        }

        .professional-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        /* Responsive design enhancements */
        @media (max-width: 768px) {
          .component-card {
            border-radius: 16px;
            margin: 0 8px;
          }
        }
      `}</style>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left sidebar */}
          <div className="md:w-1/4 sidebar-container">
            <Sidebar />
          </div>
          
          {/* Main content - Feed */}
          <div className="md:w-2/4 feed-container">
            <Feed />
          </div>
          
          {/* Right sidebar - Trending */}
          <div className="md:w-1/4 trending-container">
            <Trending />
          </div>
        </div>
      </div>
      
      {/* Floating elements for visual enhancement */}
      <div className="fixed top-20 right-10 w-4 h-4 rounded-full opacity-20 floating" 
           style={{ background: 'var(--primary-purple)' }}></div>
      <div className="fixed bottom-20 left-10 w-6 h-6 rounded-full opacity-15 floating" 
           style={{ background: 'var(--light-purple)', animationDelay: '2s' }}></div>
      <div className="fixed top-1/2 left-20 w-3 h-3 rounded-full opacity-25 floating" 
           style={{ background: 'var(--success-green)', animationDelay: '4s' }}></div>
    </div>
  );
};

export default LandingPage;