import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Mail, Lock as LockIcon, Sparkles } from 'lucide-react';

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e?.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);
        
        // --- CRITICAL LINE: THIS SAVES YOUR ID ---
        localStorage.setItem("adminId", data.id); 
        // ----------------------------------------

        alert("Welcome back, " + (data.name || "User") + "!");
        onNavigate?.('dashboard');
      } else {
        alert("Login failed: " + (data.status || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not connect to the server. Is the Go backend running?");
    }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-300/30 to-primary-500/30 rounded-full blur-3xl"></div>
            <div className="relative glass-strong rounded-3xl p-12 shadow-strong">
              <div className="w-64 h-64 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <LogIn className="w-32 h-32 text-white relative z-10" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4 animate-slide-up animation-delay-200">
            <h2 className="text-3xl font-black text-gray-900">
              Welcome back to <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">PeerPulse</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Access your admin dashboard and manage feedback sessions
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="glass-strong rounded-3xl p-8 lg:p-12 shadow-strong animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/50 border border-primary-300/30 mb-4">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-gray-700">Admin Portal</span>
            </div>
            <h1 className="text-4xl font-black mb-2 text-gray-900">Welcome back</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-lg group"
            >
              <span>Sign in</span>
              <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate?.('register')} 
                className="text-accent-yellow-dark font-bold hover:underline transition-all"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;