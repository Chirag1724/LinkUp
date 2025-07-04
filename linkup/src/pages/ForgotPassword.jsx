import { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative w-full max-w-md">
          {/* Success Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-8 py-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <img src="./logo.jpg" alt="My Logo" className="w-8 h-8 object-contain"/>
                  </div>
                  <h1 className="text-3xl font-bold text-white">LinkUp</h1>
                </div>
                <p className="text-purple-100 text-sm">Password reset request sent</p>
              </div>
            </div>
            
            {/* Success Content */}
            <div className="px-8 py-8 text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                <p className="text-gray-600">
                  We've sent a password reset link to <span className="font-semibold text-purple-600">{email}</span>
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-purple-700">
                  <p className="font-semibold mb-1">What's next?</p>
                  <p>Click the link in your email to reset your password. The link will expire in 1 hour.</p>
                </div>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Forgot Password Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-8 py-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <img src="./logo.jpg" alt="My Logo" className="w-8 h-8 object-contain"/>
                </div>
                <h1 className="text-3xl font-bold text-white">LinkUp</h1>
              </div>
              <p className="text-purple-100 text-sm">Reset your password</p>
            </div>
          </div>
          
          {/* Form */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
              <p className="text-gray-600 text-sm">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
            
            <form onSubmit={handleForgot} className="space-y-6">
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
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
            
            {/* Back to Login */}
            <div className="mt-8 text-center">
              <button
                onClick={handleBackToLogin}
                className="text-purple-600 hover:text-purple-800 font-semibold transition-colors hover:underline flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Secure password reset powered by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;