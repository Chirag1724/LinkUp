import React, { useState, useEffect, useRef } from "react";

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState("/hero.png");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const feedRef = useRef(null);
  const postsRef = useRef([]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Day 1 of #30DaysOfCode – The Journey Begins! 🚀\n\n Starting my coding journey with React and exploring the amazing world of web development. Can't wait to share my progress with the community!",
      image: "/React_Devloper.webp",
      time: new Date().toLocaleString(),
      likes: 24,
      comments: ["Great start! Keep it up! 💪", "Looking forward to your journey!", "You've got this! 🔥"],
    },
    {
      id: 2,
      content: "Just attended an amazing Tech Talk about AI and Machine Learning! 🤖\n\n The insights shared were incredible – from neural networks to real-world applications.Energized and inspired by the potential of AI. The future of tech is bright!#TechTalk #AI #MachineLearning #FutureTech",
      image: "Machine_learn.webp",
      time: new Date().toLocaleString(),
      likes: 18,
      comments: ["Sounds fascinating!", "Which speaker did you like most?"],
    },
  ]);

  // GSAP Animation effects
  useEffect(() => {
    // Animate posts on mount
    postsRef.current.forEach((post, index) => {
      if (post) {
        // Initial state
        post.style.opacity = '0';
        post.style.transform = 'translateY(50px)';
        
        // Animate in
        setTimeout(() => {
          post.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          post.style.opacity = '1';
          post.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, [posts]);

  // Modal animations
  useEffect(() => {
    if (isModalOpen) {
      const modal = document.querySelector('.modal-content');
      if (modal) {
        modal.style.transform = 'scale(0.8) translateY(-50px)';
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          modal.style.transform = 'scale(1) translateY(0)';
          modal.style.opacity = '1';
        }, 10);
      }
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    const modal = document.querySelector('.modal-content');
    if (modal) {
      modal.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      modal.style.transform = 'scale(0.8) translateY(-50px)';
      modal.style.opacity = '0';
      setTimeout(() => {
        setIsModalOpen(false);
        setPostContent("");
        setImage("/hero.png");
      }, 200);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (postContent.trim() === "") return;

    const newPost = {
      id: Date.now(),
      content: postContent,
      image: image,
      time: new Date().toLocaleString(),
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    closeModal();
  };

  const handleLike = (id) => {
    // Add like animation
    const likeBtn = document.querySelector(`[data-like="${id}"]`);
    if (likeBtn) {
      likeBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 200);
    }

    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: likedPosts.has(id) ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );

    setLikedPosts((prevLikedPosts) => {
      const newLikedPosts = new Set(prevLikedPosts);
      if (newLikedPosts.has(id)) {
        newLikedPosts.delete(id);
      } else {
        newLikedPosts.add(id);
      }
      return newLikedPosts;
    });
  };

  const handleComment = (id) => {
    const comment = commentInputs[id]?.trim();
    if (!comment) return;
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  const toggleComments = (id) => {
    setVisibleComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff, #e9d5ff)' }}>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6" ref={feedRef}>
        {/* Create post card */}
        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-all duration-300" style={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.12)' }}>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/photo.jpg"
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-purple-200"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <button
                onClick={openModal}
                className="flex-1 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-full py-4 px-6 text-left text-gray-600 transition-all duration-300 hover:shadow-md"
              >
                <span className="font-medium">Share your thoughts with the community...</span>
              </button>
            </div>
            <div className="flex justify-between mt-6 pt-4 border-t border-purple-100">
              <button className="flex items-center px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 text-gray-600 group">
                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">📸</span>
                <span className="text-sm font-semibold">Media</span>
              </button>
              <button className="flex items-center px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 text-gray-600 group">
                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">💼</span>
                <span className="text-sm font-semibold">Job</span>
              </button>
              <button className="flex items-center px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 text-gray-600 group">
                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">✍️</span>
                <span className="text-sm font-semibold">Article</span>
              </button>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            ref={el => postsRef.current[index] = el}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all duration-300"
            style={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.12)' }}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src="/photo.jpg"
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-purple-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-800">Chirag Dwivedi</h3>
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    <span className="text-sm text-purple-600 font-medium">2nd+</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Front End Developer | React Enthusiast</p>
                  <p className="text-xs text-gray-400 mt-1">{post.time}</p>
                </div>
                <button className="p-2 rounded-full hover:bg-purple-50 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
              </div>
              
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              {/* Engagement stats */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-purple-100">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xs">👍</span>
                    <span className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center text-xs">❤️</span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{post.likes} likes</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button 
                    onClick={() => toggleComments(post.id)} 
                    className="hover:text-purple-600 transition-colors font-medium"
                  >
                    {post.comments.length} comments
                  </button>
                  <span>•</span>
                  <span>2 shares</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-purple-100 bg-gradient-to-r from-purple-50/50 to-transparent">
              <div className="flex">
                <button
                  onClick={() => handleLike(post.id)}
                  data-like={post.id}
                  className={`flex items-center justify-center py-3 px-4 flex-1 hover:bg-purple-50 transition-all duration-200 ${
                    likedPosts.has(post.id) ? "text-purple-600 bg-purple-50" : "text-gray-600"
                  }`}
                  style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  <span className="text-lg mr-2">👍</span>
                  <span className="font-semibold text-sm">Like</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center justify-center py-3 px-4 flex-1 hover:bg-purple-50 transition-all duration-200 text-gray-600"
                >
                  <span className="text-lg mr-2">💬</span>
                  <span className="font-semibold text-sm">Comment</span>
                </button>

                <button className="flex items-center justify-center py-3 px-4 flex-1 hover:bg-purple-50 transition-all duration-200 text-gray-600">
                  <span className="text-lg mr-2">↪️</span>
                  <span className="font-semibold text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Comments section */}
            {visibleComments[post.id] && (
              <div className="bg-gradient-to-b from-purple-50/30 to-purple-50/10 p-6 border-t border-purple-100">
                {post.comments.map((comment, index) => (
                  <div key={index} className="mb-4 pb-4 border-b border-purple-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex space-x-3">
                      <img
                        src="/hero.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-purple-200"
                      />
                      <div className="flex-1">
                        <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100">
                          <h4 className="font-semibold text-sm text-gray-800">Community Member</h4>
                          <p className="text-sm text-gray-700 mt-1">{comment}</p>
                        </div>
                        <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                          <button className="font-medium hover:text-purple-600 transition-colors">Like</button>
                          <button className="font-medium hover:text-purple-600 transition-colors">Reply</button>
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add comment */}
                <div className="flex space-x-3 mt-4">
                  <img
                    src="/photo.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-purple-200"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Add a thoughtful comment..."
                      className="w-full py-3 px-4 pr-12 bg-white rounded-full border border-purple-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleComment(post.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 disabled:text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Create post modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="modal-content bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-purple-100" style={{ background: 'linear-gradient(135deg, #6b46c1, #8b5cf6, #a855f7)' }}>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Create Post</h2>
                  <button 
                    onClick={closeModal}
                    className="text-white hover:text-purple-200 rounded-full p-2 hover:bg-white/10 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src="/hero.png"
                      alt="Profile"
                      className="w-14 h-14 rounded-full border-2 border-purple-200"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Chirag Dwivedi</h3>
                    <select className="text-sm border border-purple-200 rounded-lg px-3 py-1 bg-purple-50 text-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200">
                      <option>🌎 Anyone</option>
                      <option>👥 Connections only</option>
                      <option>🔒 Only me</option>
                    </select>
                  </div>
                </div>
                
                <textarea
                  className="w-full border-0 focus:ring-0 p-4 resize-none h-40 placeholder-gray-500 text-gray-800 rounded-lg bg-purple-50/50 focus:bg-purple-50 transition-all duration-200"
                  placeholder="What's happening in your tech world? Share your thoughts, insights, or experiences..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                
                <div className="relative mt-4">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="rounded-xl w-full max-h-80 object-cover border-2 border-purple-100" 
                  />
                  {image !== "/hero.png" && (
                    <button 
                      className="absolute top-3 right-3 bg-gray-900 bg-opacity-75 rounded-full p-2 text-white hover:bg-opacity-90 transition-all duration-200"
                      onClick={() => setImage("./Machine_learn.webp")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t border-purple-100 bg-gradient-to-r from-purple-50/50 to-transparent">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <label className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-100 cursor-pointer text-purple-600 transition-all duration-200 hover:scale-110">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </label>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-100 text-purple-600 transition-all duration-200 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-100 text-purple-600 transition-all duration-200 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handlePost}
                    disabled={!postContent.trim()}
                    className="px-8 py-3 rounded-full font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    style={{ 
                      background: postContent.trim() ? 'linear-gradient(135deg, #6b46c1, #8b5cf6)' : '#d1d5db',
                      boxShadow: postContent.trim() ? '0 8px 32px rgba(139, 92, 246, 0.3)' : 'none'
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;