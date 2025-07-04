import { useState, useEffect, useRef } from "react";
import { 
  ThumbsUp, 
  MessageCircle, 
  Send, 
  User, 
  Code, 
  BookOpen, 
  Rocket, 
  Trophy, 
  Users, 
  Filter, 
  Search,
  Menu,
  X
} from "lucide-react";
import Navbar from "../Components/Navbar";

const Forums = () => {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: "Aryan Sharma", 
      authorRole: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "How to prepare for tech interviews at FAANG companies? Looking for structured resources and advice from those who've been through the process.", 
      likes: 42, 
      comments: [
        { author: "Neha Patel", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face", content: "Practice DSA daily on LeetCode! Focus on medium difficulty problems." },
        { author: "Raj Mehta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", content: "Check out 'Cracking the Coding Interview' book and AlgoExpert. They were game-changers for me." }
      ], 
      showComments: false, 
      liked: false,
      tags: ["Interviews", "Career", "DSA"],
      category: "Career",
      timestamp: "2 hours ago"
    },
    { 
      id: 2, 
      author: "Neha Patel", 
      authorRole: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
      content: "What are the best resources to learn React in 2025? I've been using Angular but want to switch to React for better job prospects.", 
      likes: 28, 
      comments: [
        { author: "Aryan Sharma", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", content: "React Docs are great after their recent redesign! Very beginner-friendly." },
        { author: "Maya Singh", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", content: "Try Fullstackopen.com - it's free and comprehensive. The React section is excellent." }
      ], 
      showComments: false, 
      liked: false,
      tags: ["React", "Frontend", "Learning"],
      category: "Frontend",
      timestamp: "4 hours ago"
    },
    { 
      id: 3, 
      author: "Vikram Yadav", 
      authorRole: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Has anyone implemented CI/CD pipelines with GitHub Actions for a microservices architecture? Looking for best practices and common pitfalls to avoid.", 
      likes: 18, 
      comments: [], 
      showComments: false, 
      liked: false,
      tags: ["DevOps", "CI/CD", "GitHub"],
      category: "DevOps",
      timestamp: "6 hours ago"
    },
    { 
      id: 4, 
      author: "Priya Gupta", 
      authorRole: "AI/ML Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Just deployed my first transformer model in production! The journey from research to deployment taught me so much about model optimization and serving infrastructure.", 
      likes: 35, 
      comments: [
        { author: "Tech Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", content: "Congratulations! What optimization techniques did you use?" }
      ], 
      showComments: false, 
      liked: false,
      tags: ["AI/ML", "Production", "Success"],
      category: "AI/ML",
      timestamp: "1 day ago"
    },
    { 
      id: 5, 
      author: "Rohit Kumar", 
      authorRole: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Microservices vs Monolith: When should you make the switch? I'm working on a project that's growing rapidly and considering the architecture change.", 
      likes: 24, 
      comments: [
        { author: "Senior Architect", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", content: "Start with a monolith, extract services when you have clear boundaries and team structure." }
      ], 
      showComments: false, 
      liked: false,
      tags: ["Architecture", "Microservices", "Backend"],
      category: "Backend",
      timestamp: "1 day ago"
    },
    { 
      id: 6, 
      author: "Anita Reddy", 
      authorRole: "System Design Expert",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "System Design Interview: How to approach designing a distributed cache like Redis? Here's a comprehensive breakdown of the key components and considerations.", 
      likes: 67, 
      comments: [
        { author: "Junior Dev", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", content: "This is exactly what I needed! Thank you for the detailed explanation." },
        { author: "Tech Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", content: "Great breakdown! Would love to see more system design posts." }
      ], 
      showComments: false, 
      liked: false,
      tags: ["System Design", "Redis", "Distributed Systems"],
      category: "System Design",
      timestamp: "2 days ago"
    }
  ]);
  
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("General");
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const postsRef = useRef([]);

  // Updated categories array to include General
  const categories = ["All", "Frontend", "Backend", "DevOps", "Career", "AI/ML", "System Design", "General"];

  const trendingTopics = [
    { icon: Rocket, title: "React 19 Features", count: "156 discussions", category: "Frontend" },
    { icon: Code, title: "System Design Patterns", count: "89 discussions", category: "System Design" },
    { icon: Trophy, title: "AI in Web Development", count: "203 discussions", category: "AI/ML" },
    { icon: Users, title: "Remote Work Best Practices", count: "74 discussions", category: "Career" }
  ];

  const chiragAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";

  // Filter posts based on active category and search term
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category) => {
    if (category === "All") return posts.length;
    return posts.filter(post => post.category === category).length;
  };

  // Simulate loading and animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Animate elements on scroll
  useEffect(() => {
    if (!isLoading) {
      // Animate hero section
      if (heroRef.current) {
        heroRef.current.style.transform = 'translateY(0)';
        heroRef.current.style.opacity = '1';
      }

      // Animate posts with stagger
      postsRef.current.forEach((post, index) => {
        if (post) {
          setTimeout(() => {
            post.style.transform = 'translateY(0)';
            post.style.opacity = '1';
          }, index * 150);
        }
      });
    }
  }, [isLoading]);

  const addPost = (e) => {
    e && e.preventDefault();
    
    if (newPost.trim()) {
      const newPostObj = { 
        id: Date.now(),
        author: "Chirag Dwivedi", 
        authorRole: "Tech Enthusiast",
        avatar: chiragAvatar,
        content: newPost, 
        likes: 0, 
        comments: [], 
        showComments: false, 
        liked: false,
        tags: ["General"],
        category: selectedCategory, // Use selected category instead of hardcoded "General"
        timestamp: "Just now"
      };
      
      setPosts([newPostObj, ...posts]);
      setNewPost("");
    }
  };

  const likePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
    ));
  };

  const toggleComments = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const addComment = (id, e) => {
    e && e.preventDefault();
    
    if (newComment[id]?.trim()) {
      setPosts(posts.map(post => {
        if (post.id === id) {
          return { 
            ...post, 
            comments: [...post.comments, {
              author: "Chirag Dwivedi",
              avatar: chiragAvatar,
              content: newComment[id]
            }], 
            showComments: true 
          };
        }
        return post;
      }));
      
      setNewComment(prev => ({ ...prev, [id]: "" }));
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--gradient-background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center">
          <div style={{
            width: '4rem',
            height: '4rem',
            border: '4px solid var(--bg-light-purple)',
            borderTop: '4px solid var(--primary-purple)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'var(--primary-purple)', fontWeight: '500' }}>Loading TechTalks...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--gradient-background)',
      color: 'var(--text-primary)'
    }}>
      <style>{`
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
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div 
          ref={heroRef}
          className="text-center mb-12"
          style={{ transform: 'translateY(30px)', opacity: '0', transition: 'all 0.8s ease-out' }}
        >
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'var(--gradient-header)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            TechTalks Forum
          </h1>
          <p style={{ 
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Connect, learn, and grow with fellow developers. Share knowledge, ask questions, and build the future together.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search discussions, topics, or authors..."
                style={{
                  width: '100%',
                  paddingLeft: '3rem',
                  paddingRight: '1rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid var(--bg-light-purple)',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-purple)'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-purple)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--bg-light-purple)'}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Categories */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              borderRadius: '1rem',
              boxShadow: 'var(--shadow-purple)',
              border: '1px solid var(--bg-light-purple)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '1.5rem',
                background: 'var(--gradient-header)',
                color: 'white'
              }}>
                <h3 className="font-bold text-lg flex items-center">
                  <Filter className="mr-2" />
                  Categories
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: activeCategory === category ? 'var(--primary-purple)' : 'transparent',
                      color: activeCategory === category ? 'white' : 'var(--text-primary)',
                      boxShadow: activeCategory === category ? 'var(--shadow-purple)' : 'none'
                    }}
                    onClick={() => setActiveCategory(category)}
                    onMouseEnter={(e) => {
                      if (activeCategory !== category) {
                        e.target.style.backgroundColor = 'var(--bg-light-purple)';
                        e.target.style.color = 'var(--primary-purple)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== category) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--text-primary)';
                      }
                    }}
                  >
                    <span>{category}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: activeCategory === category ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-light-purple)',
                      color: activeCategory === category ? 'white' : 'var(--primary-purple)'
                    }}>
                      {getCategoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Trending Topics */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              borderRadius: '1rem',
              boxShadow: 'var(--shadow-purple)',
              border: '1px solid var(--bg-light-purple)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '1.5rem',
                background: 'var(--gradient-header)',
                color: 'white'
              }}>
                <h3 className="font-bold text-lg flex items-center">
                  <Rocket className="mr-2" />
                  Trending Topics
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer group transition-all"
                    style={{
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveCategory(topic.category)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-light-purple)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      background: 'linear-gradient(135deg, var(--bg-light-purple), var(--bg-light-purple))',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    className="group-hover:from-purple-600 group-hover:to-purple-700">
                      <topic.icon style={{ color: 'var(--primary-purple)' }} className="group-hover:text-white" />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{topic.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{topic.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {activeCategory === "All" ? "All Discussions" : `${activeCategory} Discussions`}
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'discussion' : 'discussions'}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              {(activeCategory !== "All" || searchTerm) && (
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchTerm("");
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    color: 'var(--primary-purple)',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--bg-light-purple)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Post Creation */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              borderRadius: '1rem',
              boxShadow: 'var(--shadow-purple)',
              border: '1px solid var(--bg-light-purple)',
              marginBottom: '2rem',
              overflow: 'hidden'
            }}>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={chiragAvatar} 
                    alt="Chirag Dwivedi" 
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: '2px solid var(--bg-light-purple)' }}
                  />
                  <div>
                    <h3 style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Chirag Dwivedi</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Share your thoughts with the community</p>
                  </div>
                </div>
                
                {/* Category Selection */}
                <div className="mb-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--bg-light-purple)',
                      border: '2px solid var(--bg-light-purple)',
                      borderRadius: '0.5rem',
                      color: 'var(--primary-purple)',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {categories.filter(cat => cat !== "All").map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <textarea 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'var(--bg-light-purple)',
                    border: '2px solid var(--bg-light-purple)',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    resize: 'none',
                    minHeight: '6rem'
                  }}
                  placeholder="What's on your mind? Share a technical question, insight, or discussion topic..." 
                  rows="4"
                  value={newPost} 
                  onChange={(e) => setNewPost(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-purple)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--bg-light-purple)'}
                />
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={addPost}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'var(--gradient-header)',
                      color: 'white',
                      fontWeight: '500',
                      borderRadius: '0.75rem',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = 'var(--shadow-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Post Discussion</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  ref={el => postsRef.current[index] = el}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  style={{ transform: 'translateY(30px)', opacity: '0', transition: 'all 0.6s ease-out' }}
                >
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <img 
                        src={post.avatar} 
                        alt={post.author} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                        style={{ display: 'none' }}
                      >
                        {getInitials(post.author)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{post.author}</h3>
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span className="text-sm text-gray-500">{post.authorRole}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{post.timestamp}</p>
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center space-x-6 pt-4 border-t border-purple-100">
                      <button 
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          post.liked 
                            ? "bg-purple-100 text-purple-600" 
                            : "text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                        }`} 
                        onClick={() => likePost(post.id)}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          post.showComments 
                            ? "bg-purple-100 text-purple-600" 
                            : "text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                        }`} 
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {post.showComments && (
                    <div className="bg-purple-50/50 border-t border-purple-100 p-6">
                      {post.comments.length > 0 ? (
                        <div className="space-y-4 mb-6">
                          {post.comments.map((comment, commentIndex) => (
                            <div key={commentIndex} className="flex space-x-3">
                              <img 
                                src={comment.avatar} 
                                alt={comment.author} 
                                className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div 
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                style={{ display: 'none' }}
                              >
                                {getInitials(comment.author)}
                              </div>
                              <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                                <div className="font-medium text-gray-800 mb-1">{comment.author}</div>
                                <p className="text-gray-600">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No comments yet. Start the conversation!</p>
                      )}
                      
                      {/* Add Comment */}
                      <div className="flex space-x-3">
                        <img 
                          src={chiragAvatar} 
                          alt="Chirag Dwivedi" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ display: 'none' }}
                        >
                          CD
                        </div>
                        <div className="flex-1 flex space-x-2">
                          <input 
                            type="text" 
                            className="flex-1 px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" 
                            placeholder="Write a thoughtful comment..."
                            value={newComment[post.id] || ""}
                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && addComment(post.id, e)}
                          />
                          <button 
                            onClick={(e) => addComment(post.id, e)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No discussions found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? `No results for "${searchTerm}"` : `No discussions in ${activeCategory} category`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forums;