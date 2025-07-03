import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, Mic, Calendar, ArrowRight, Star, TrendingUp, ChevronRight, MessageCircle, Network, Award, Building2, Target } from 'lucide-react';

// Enhanced professional styles with better text sizing and responsive design
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', sans-serif;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  .locomotive-scroll-container {
    overflow: hidden;
  }
  
  @keyframes subtle-fade-in {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-subtle-fade-in {
    animation: subtle-fade-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  @keyframes gentle-float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(2deg);
    }
  }
  
  .animate-gentle-float {
    animation: gentle-float 8s ease-in-out infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
    }
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  .section-fade {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .section-fade.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .professional-gradient {
    background: linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #1e3a8a 100%);
  }
  
  .card-hover-effect {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-style: preserve-3d;
  }
  
  .card-hover-effect:hover {
    transform: translateY(-8px) rotateX(5deg);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  
  .hero-text {
    opacity: 0;
    transform: translateY(60px);
  }
  
  .hero-text.animate {
    animation: subtle-fade-in 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .stagger-1 { animation-delay: 0.2s; }
  .stagger-2 { animation-delay: 0.4s; }
  .stagger-3 { animation-delay: 0.6s; }
  .stagger-4 { animation-delay: 0.8s; }
  
  .parallax-bg {
    will-change: transform;
  }
  
  .company-logo {
    filter: grayscale(100%) opacity(0.7);
    transition: all 0.3s ease;
  }
  
  .company-logo:hover {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.1);
  }
  
  .magnetic-effect {
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .text-reveal {
    overflow: hidden;
  }
  
  .text-reveal span {
    display: inline-block;
    transform: translateY(100%);
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .text-reveal.animate span {
    transform: translateY(0);
  }
  
  /* Responsive text sizing */
  @media (max-width: 640px) {
    .hero-title {
      font-size: 2.5rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-subtitle {
      font-size: 2.25rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-description {
      font-size: 1.125rem !important;
      line-height: 1.6 !important;
    }
    
    .section-title {
      font-size: 2.5rem !important;
      line-height: 1.1 !important;
    }
    
    .section-subtitle {
      font-size: 1rem !important;
      line-height: 1.5 !important;
    }
  }
  
  @media (min-width: 641px) and (max-width: 768px) {
    .hero-title {
      font-size: 3.5rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-subtitle {
      font-size: 3rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-description {
      font-size: 1.25rem !important;
      line-height: 1.6 !important;
    }
    
    .section-title {
      font-size: 3rem !important;
      line-height: 1.1 !important;
    }
    
    .section-subtitle {
      font-size: 1.125rem !important;
      line-height: 1.5 !important;
    }
  }
  
  @media (min-width: 769px) {
    .hero-title {
      font-size: 4.5rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-subtitle {
      font-size: 4rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-description {
      font-size: 1.5rem !important;
      line-height: 1.6 !important;
    }
    
    .section-title {
      font-size: 3.5rem !important;
      line-height: 1.1 !important;
    }
    
    .section-subtitle {
      font-size: 1.25rem !important;
      line-height: 1.5 !important;
    }
  }
  
  @media (min-width: 1024px) {
    .hero-title {
      font-size: 5rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-subtitle {
      font-size: 4.5rem !important;
      line-height: 1.1 !important;
    }
  }
`;

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const locomotiveRef = useRef(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    // Simulate page load
    setTimeout(() => {
      setIsLoaded(true);
      // Animate hero text
      const heroTexts = document.querySelectorAll('.hero-text');
      heroTexts.forEach(text => text.classList.add('animate'));

      // Animate text reveals
      const textReveals = document.querySelectorAll('.text-reveal');
      textReveals.forEach(text => text.classList.add('animate'));
    }, 500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      // Parallax effect for hero background
      const heroElement = heroRef.current;
      if (heroElement) {
        const parallaxValue = scrollPosition * 0.5;
        heroElement.style.transform = `translateY(${parallaxValue}px)`;
      }

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));

      const currentSection = sectionElements.find((section, index) => {
        const nextSection = sectionElements[index + 1];
        return scrollPosition >= section.offset - 100 &&
          (!nextSection || scrollPosition < nextSection.offset - 100);
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }

      // Fade in sections on scroll with stagger effect
      const fadeElements = document.querySelectorAll('.section-fade');
      fadeElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 100);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation handlers
  const handleNavigation = (page) => {
    setCurrentPage(page);
    navigate("/login"); // Redirect to login page
  };

  const features = [
    {
      icon: Network,
      title: "Strategic Networking",
      description: "Build valuable professional relationships with industry leaders and decision-makers across your sector.",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: GraduationCap,
      title: "Alumni Network",
      description: "Connect with accomplished alumni for mentorship, career guidance, and professional development opportunities.",
      color: "from-indigo-600 to-indigo-700"
    },
    {
      icon: Mic,
      title: "Industry Insights",
      description: "Access exclusive industry presentations, panel discussions, and thought leadership content from experts.",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Calendar,
      title: "Professional Events",
      description: "Attend curated networking events, workshops, and professional development sessions in your area.",
      color: "from-slate-600 to-slate-700"
    }
  ];

  const stats = [
    { number: "25,000+", label: "Professional Members", icon: Users },
    { number: "500+", label: "Industry Sessions", icon: Mic },
    { number: "200+", label: "Annual Events", icon: Calendar },
    { number: "92%", label: "Career Advancement Rate", icon: TrendingUp }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "VP of Engineering, TechCorp",
      content: "LinkUp has been instrumental in expanding my professional network. The quality of connections and industry insights have directly contributed to my career advancement.",
      avatar: "SM",
      image: "https://images.unsplash.com/photo-1494790108755-2616b60d1ec3?w=150&h=150&fit=crop&crop=face",
      company: "TechCorp"
    },
    {
      name: "David Chen",
      role: "Senior Director, Innovation Lab",
      content: "The alumni network feature has revolutionized how we engage with our graduates. It's creating meaningful professional relationships that benefit both mentors and mentees.",
      avatar: "DC",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "Innovation Lab"
    },
    {
      name: "Rachel Thompson",
      role: "Chief Technology Officer",
      content: "The industry insights and networking opportunities on LinkUp have been invaluable for staying current with trends and building strategic partnerships.",
      avatar: "RT",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "DataFlow Systems"
    }
  ];

  const companyLogos = [
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/480px-Microsoft_logo.svg.png"
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/480px-Google_2015_logo.svg.png"
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/195px-Apple_logo_black.svg.png"
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/480px-Amazon_logo.svg.png"
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/480px-Meta_Platforms_Inc._logo.svg.png"
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/240px-Tesla_T_symbol.svg.png"
    }
  ];

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-white locomotive-scroll-container" ref={locomotiveRef}>

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Custom Logo */}
               <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <img src="./logo.jpg" alt="My Logo" className="w-8 h-8 object-contain"/>
                  </div>
                  <div>
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      LinkUp
                    </span>
                    <div className="text-xs text-gray-500 font-medium hidden sm:block">Professional Network</div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {sections.slice(1, -1).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative text-gray-700 hover:text-indigo-600 transition-all duration-300 font-semibold py-2 px-1 ${activeSection === section.id ? 'text-indigo-600' : ''
                      }`}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button 
                  onClick={() => handleNavigation('signin')}
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-semibold text-sm sm:text-base"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleNavigation('signup')}
                  className="magnetic-effect bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            ref={heroRef}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(67, 56, 202, 0.9), rgba(139, 92, 246, 0.8)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2671&q=80')`,
            }}
          />

          {/* Enhanced Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-300/20 rounded-full blur-3xl animate-gentle-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-purple-300/20 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-36 h-36 sm:w-48 sm:h-48 bg-blue-300/20 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-emerald-300/20 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: '6s' }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="text-reveal hero-text stagger-1">
                <span>
                  <h1 className="hero-title font-black text-white mb-4 sm:mb-8 leading-tight tracking-tight">
                    Connect. Learn.
                  </h1>
                </span>
              </div>

              <div className="text-reveal hero-text stagger-2">
                <span>
                  <h1 className="hero-subtitle font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-8 sm:mb-12 leading-tight tracking-tight">
                    Grow Together
                  </h1>
                </span>
              </div>

              <div className="hero-text stagger-3">
                <p className="hero-description text-indigo-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                  The premier platform for ambitious professionals to network, attend exclusive tech talks, and unlock career opportunities
                </p>
              </div>

              <div className="hero-text stagger-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <button 
                    onClick={() => handleNavigation('networking')}
                    className="group bg-white text-indigo-600 px-6 sm:px-10 py-3 sm:py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center space-x-3 shadow-xl text-base sm:text-lg w-full sm:w-auto justify-center"
                  >
                    <span>Start Networking</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="about" className="py-16 sm:py-32 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-indigo-50/30"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-20 section-fade">
              <h2 className="section-title font-black text-gray-900 mb-4 sm:mb-8 tracking-tight">
                Trusted by Industry Leaders
              </h2>
              <p className="section-subtitle text-gray-600 max-w-3xl mx-auto font-medium">
                Join thousands of successful professionals who have transformed their careers through meaningful connections
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 section-fade">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-28 sm:h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-indigo-200/50 animate-pulse-glow">
                    <stat.icon className="w-8 h-8 sm:w-14 sm:h-14 text-white" />
                  </div>
                  <div className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-2 sm:mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm sm:text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Section with Real Logos */}
        <section className="py-12 sm:py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs sm:text-sm font-bold text-gray-500 mb-8 sm:mb-12 uppercase tracking-wide">
              Trusted by professionals at leading companies
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 sm:gap-12 items-center">
              {companyLogos.map((company, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center h-12 sm:h-16">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="company-logo max-h-8 sm:max-h-12 max-w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-32 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.9)), url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')`,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-24 section-fade">
              <h2 className="section-title font-black text-gray-900 mb-6 sm:mb-10 tracking-tight">
                Powerful Features for
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Growth
                </span>
              </h2>
              <p className="section-subtitle text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Everything you need to build meaningful professional relationships, advance your career, and unlock new opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 section-fade">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-white/50 card-hover-effect"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br ${feature.color} rounded-2xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                    <feature.icon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 sm:mb-8 leading-relaxed text-sm sm:text-base">{feature.description}</p>

                  <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm sm:text-base">Learn More</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 bg-gradient-to-br from-gray-50 to-indigo-50/50 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl animate-gentle-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '3s' }}></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-24 section-fade">
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-10 tracking-tight">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                Discover how professionals like you have transformed their careers through our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 section-fade">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="group bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border border-gray-100/50 card-hover-effect">
                  <div className="flex items-center mb-8">
                    <div className="w-20 h-20 rounded-full mr-6 shadow-xl overflow-hidden ring-4 ring-white">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to avatar initials if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-xl" style={{ display: 'none' }}>
                        {testimonial.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">{testimonial.name}</h4>
                      <p className="text-indigo-600 text-sm font-semibold">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 font-medium">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 italic leading-relaxed text-lg">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl animate-gentle-float"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-36 h-36 bg-emerald-400/20 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '5s' }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center section-fade">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-indigo-100 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
              Join the community of ambitious professionals and start building meaningful connections that will drive your success
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center space-x-3 shadow-xl text-lg">
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              <button className="group bg-transparent border-2 border-white/80 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-500 transform hover:scale-105 flex items-center space-x-3 backdrop-blur-sm text-lg">
                <MessageCircle className="w-6 h-6" />
                <span>Contact Sales</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <img src="./logo.jpg" alt="Your Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">LinkUp</span>
                    <div className="text-xs text-gray-400">Professional Network</div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Connecting professionals worldwide through strategic networking and career development opportunities.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-lg">Platform</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Industry Insights</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Events</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-lg">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Press</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-lg">Support</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Security</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-16 pt-12 text-center">
              <p className="text-gray-400">&copy; 2025 LinkUp. All rights reserved. Built with passion for professional growth.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;