import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, Calendar, Building, Briefcase, Linkedin, ArrowRight, Shield, CheckCircle } from "lucide-react";

const Signup = () => {
  const [status, setStatus] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    setIsLoading(false);
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name: fullName,
      email,
      password,
      status,
      gradYear,
      department,
      company: status === "Alumni" ? company : "",
      jobTitle: status === "Alumni" ? jobTitle : "",
      linkedin: status === "Alumni" ? linkedin : "",
    });

    alert("Account created successfully! Please login.");
    window.location.href = "/login";
  } catch (err) {
    console.error("Signup Error:", err);
    setError(err.response?.data?.error || "Signup failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center p-4">
      {/* Custom CSS Variables */}
      <style jsx>{`
        :root {
          --primary-purple: #6b46c1;
          --secondary-purple: #8b5cf6;
          --light-purple: #a855f7;
          --success-green: #10b981;
          --light-green: #34d399;
          --warning-orange: #f59e0b;
          --bg-ultra-light: #faf5ff;
          --bg-light-purple: #f3e8ff;
          --bg-white: #ffffff;
          --text-primary: #1f2937;
          --text-secondary: #4b5563;
          --text-muted: #6b7280;
          --gradient-header: linear-gradient(135deg, #6b46c1, #8b5cf6, #a855f7);
          --gradient-background: linear-gradient(135deg, #faf5ff, #f3e8ff, #e9d5ff);
          --gradient-success: linear-gradient(135deg, #10b981, #34d399);
          --shadow-purple: 0 8px 32px rgba(139, 92, 246, 0.12);
          --shadow-hover: 0 20px 40px rgba(139, 92, 246, 0.2);
        }
      `}</style>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-2xl">
        {/* Signup Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
          {/* Header */}
          <div style={{background: 'var(--gradient-header)'}} className="px-8 py-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <img src="./logo.jpg" alt="My Logo" className="w-8 h-8 object-contain"/>
                  </div>
                <h1 className="text-3xl font-bold text-white">LinkUp</h1>
              </div>
              <p className="text-purple-100 text-sm">Join our professional alumni network</p>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleRegister} className="px-8 py-8">
            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-purple-100">
                  <User className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                </div>
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Status and Graduation Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Student">Student</option>
                      <option value="Alumni">Alumni</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="gradYear" className="block text-sm font-semibold text-gray-700">
                      Graduation Year
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                      <input
                        id="gradYear"
                        type="number"
                        placeholder="2024"
                        className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        required
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Department */}
                <div className="space-y-2">
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                    Department
                  </label>
                  <select
                    id="department"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              {/* Alumni Professional Information */}
              {status === "Alumni" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-green-100">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-800">Professional Information</h3>
                  </div>
                  
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                      <input
                        id="company"
                        type="text"
                        placeholder="Where do you work?"
                        className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Job Title */}
                  <div className="space-y-2">
                    <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                      Job Title
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                      <input
                        id="jobTitle"
                        type="text"
                        placeholder="Your current position"
                        className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* LinkedIn Profile */}
                  <div className="space-y-2">
                    <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700">
                      LinkedIn Profile <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                      <input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Account Security Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-purple-100">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Account Security</h3>
                </div>
                
                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                
                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-12 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed group"
                style={{background: isLoading ? 'var(--text-muted)' : 'var(--gradient-header)'}}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors hover:underline">
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Verified Network</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-green-500" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;