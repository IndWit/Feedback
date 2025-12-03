import React, { useState } from 'react';
import { Eye, EyeOff, Facebook, Twitter, Instagram, Linkedin, UserPlus, Mail, Lock as LockIcon, User, Sparkles } from 'lucide-react';

const RegisterPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e?.preventDefault(); // Stop reload

    // 1. Basic Validation
    if (!email || !fullName || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // 2. Send data to Go Backend
      // Note: We map 'fullName' to 'name' because that's what the Go struct expects
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: fullName, 
          password: password,
        }),
      });

      // 3. Handle Response
      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully! Please login.');
        onNavigate('login');
      } else {
        alert('Registration failed: ' + (data.status || "Unknown error"));
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("Could not connect to the server. Is the Go backend running?");
    }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/30 to-orange/30 rounded-full blur-3xl"></div>
            <div className="relative glass-strong rounded-3xl p-12 shadow-strong">
              <div className="w-64 h-64 bg-gradient-to-br from-accent-yellow via-orange to-accent-yellow-dark rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <UserPlus className="w-32 h-32 text-white relative z-10" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4 animate-slide-up animation-delay-200">
            <h2 className="text-3xl font-black text-gray-900">
              Join the <span className="bg-gradient-to-r from-accent-yellow to-orange bg-clip-text text-transparent">PeerPulse</span> community
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Start collecting honest feedback and help your team grow together
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="glass-strong rounded-3xl p-8 lg:p-12 shadow-strong animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-yellow/20 border border-accent-yellow/30 mb-4">
              <Sparkles className="w-4 h-4 text-accent-yellow-dark" />
              <span className="text-sm font-semibold text-gray-700">Free forever</span>
            </div>
            <h1 className="text-4xl font-black mb-2 text-gray-900">Create account</h1>
            <p className="text-gray-600">Get started with PeerPulse in minutes</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <LockIcon className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full text-lg group"
            >
              <span>Create account</span>
              <UserPlus className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('login')}
                className="text-accent-yellow-dark font-bold hover:underline transition-all"
              >
                Sign in
              </button>
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
            <div className="flex justify-center gap-3">
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;