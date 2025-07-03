import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Replace with your actual axios call
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); 
        
        // Show success message briefly before navigation
        setError("");
        setTimeout(() => {
          // navigate("/"); // Replace with your navigation logic
          console.log("Navigation to home page");
        }, 500);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // navigate("/forgot-password"); // Replace with your navigation logic
    console.log("Navigating to forgot password page");
    // You can replace this with your actual navigation
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    // Add your Google OAuth logic here
  };

  const handleTwitterLogin = () => {
    console.log("Twitter login initiated");
    // Add your Twitter OAuth logic here
  };

  const handleGithubLogin = () => {
    console.log("GitHub login initiated");
    // Add your GitHub OAuth logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-8 py-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {/* Logo Placeholder - Replace with your actual logo */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <img src="./logo.jpg" alt="My Logo" className="w-8 h-8 object-contain"/>
                  </div>
                <h1 className="text-3xl font-bold text-white">LinkUp</h1>
              </div>
              <p className="text-purple-100 text-sm">Welcome back to your alumni network</p>
            </div>
          </div>
          
          {/* Form */}
          <div className="px-8 py-8">
            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              
              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
            
            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                
                {/* Twitter */}
                <button
                  type="button"
                  onClick={handleTwitterLogin}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="#1DA1F2" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                
                {/* GitHub */}
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button 
                  onClick={handleSignUp}
                  className="text-purple-600 hover:text-purple-800 font-semibold transition-colors hover:underline"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Secure login powered by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;