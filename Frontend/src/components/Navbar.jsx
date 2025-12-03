import React from 'react';

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-white/30">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-yellow to-accent-yellow-dark flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
              PeerPulse
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-yellow group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => onNavigate('submitFeedback')}
              className="text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Give Feedback
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-yellow group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0.5 bg-accent-yellow group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('login')}
              className="btn-secondary text-sm"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="btn-primary text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;