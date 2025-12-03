import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, LogOut, TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, BarChart3, Sparkles } from 'lucide-react';
// import Navbar from '../components/Navbar'; 

// Placeholder Navbar
const Navbar = ({ onNavigate }) => (
  <nav className="sticky top-0 z-50 glass-strong px-8 py-4">
    <div className="container-custom flex justify-between items-center">
      <button 
        onClick={() => onNavigate && onNavigate('landing')}
        className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-yellow to-accent-yellow-dark flex items-center justify-center">
          <span className="text-white font-black text-lg">P</span>
        </div>
        <span className="font-black text-xl text-gray-900">PeerPulse</span>
        <span className="text-xs px-2 py-1 rounded-full bg-accent-yellow/20 text-accent-yellow-dark font-bold">Admin</span>
      </button>
      <button onClick={() => onNavigate && onNavigate('login')} className="btn-secondary flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  </nav>
);

const AdminDashboard = ({ onNavigate, sessionId }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [stats, setStats] = useState({ total: 0, positive: 0, negative: 0 });
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(sessionId);

  // 1. Load Data on Mount
  const fetchData = async () => {
    setLoading(true);
    // Logic: Try the prop first, fallback to localStorage if page refreshed
    let idToUse = sessionId || localStorage.getItem("selectedSessionId");
    setCurrentId(idToUse);

    console.log("Dashboard loading for Session ID:", idToUse); // DEBUG LOG

    if (!idToUse) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/view-feedback?session_id=${idToUse}`);
      const data = await response.json();
      
      console.log("Feedback received from backend:", data); // DEBUG LOG

      // Safety check: ensure data is an array
      const safeData = Array.isArray(data) ? data : [];
      setFeedbackData(safeData);
      calculateStats(safeData);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sessionId]);

  // 2. Helper: Parse the "Level" from the comment string
  // Backend saves: "[Level: Excellent] The actual comment..."
  const parseFeedback = (fullComment) => {
    // Check if comment exists to prevent crashes
    if (!fullComment) return { level: 'Neutral', text: 'No comment provided' };

    const match = fullComment.match(/\[Level: (.*?)\] (.*)/);
    if (match) {
      return { level: match[1], text: match[2] };
    }
    // Fallback for old data
    return { level: 'Neutral', text: fullComment };
  };

  // 3. Helper: Calculate Stats dynamically
  const calculateStats = (data) => {
    let pos = 0;
    let neg = 0;

    data.forEach(item => {
      const { level } = parseFeedback(item.comment);
      if (['Excellent', 'Good'].includes(level)) pos++;
      if (['Poor', 'Bad'].includes(level)) neg++;
    });

    setStats({
      total: data.length,
      positive: pos,
      negative: neg
    });
  };

  // 4. Helper: Get Badge Color
  const getSentimentColor = (level) => {
    switch (level) {
      case 'Excellent':
      case 'Good': 
        return 'bg-green-100 text-green-800 border-green-200'; // Positive
      case 'Bad': 
      case 'Poor': 
        return 'bg-red-100 text-red-800 border-red-200'; // Negative
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200'; // Neutral/Fair
    }
  };

  return (
    <div className="min-h-screen gradient-mesh flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 section">
        <div className="container-custom">
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-3 text-gray-900">Dashboard</h1>
                <p className="text-lg text-gray-600 mb-4">Real-time overview of incoming feedback</p>
                {currentId ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-yellow/30">
                    <Sparkles className="w-4 h-4 text-accent-yellow" />
                    <span className="text-sm font-semibold text-gray-700">Session:</span>
                    <span className="font-mono font-bold text-accent-yellow-dark">{currentId}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-300">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-red-700">No session selected</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={fetchData} className="btn-secondary flex items-center gap-2 group">
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Refresh</span>
                </button>
                <button onClick={() => onNavigate && onNavigate('selectSession')} className="btn-secondary flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Switch Session</span>
                </button>
                <button onClick={() => onNavigate && onNavigate('createSession')} className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create New</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="card group animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">ALL TIME</div>
              </div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Total Responses</h3>
              <p className="text-4xl font-black text-gray-900">{stats.total}</p>
            </div>
            
            <div className="card group animate-fade-in animation-delay-100">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">POSITIVE</div>
              </div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Positive Sentiment</h3>
              <p className="text-4xl font-black text-green-600">{stats.positive}</p>
            </div>
            
            <div className="card group animate-fade-in animation-delay-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ThumbsDown className="w-6 h-6 text-red-600" />
                </div>
                <div className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">NEEDS WORK</div>
              </div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Areas to Improve</h3>
              <p className="text-4xl font-black text-red-500">{stats.negative}</p>
            </div>
          </div>

          {/* Recent Feedback Table */}
          <div className="card mb-12 overflow-hidden animate-fade-in animation-delay-300">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-accent-yellow-dark" />
                <h2 className="text-2xl font-black text-gray-900">Recent Feedback</h2>
              </div>
            </div>
          
          {loading ? (
             <div className="p-10 text-center text-gray-500">Loading data...</div>
          ) : feedbackData.length === 0 ? (
             <div className="p-10 text-center text-gray-400 italic">No feedback received for this session yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Sentiment</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Respondent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feedbackData.map((item, index) => {
                    const { level, text } = parseFeedback(item.comment);
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 font-bold text-gray-700">
                           {item.rating} <span className="text-accent-yellow">★</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 leading-relaxed max-w-lg">{text}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSentimentColor(level)}`}>
                            {level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 italic">Anonymous</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

          {/* Placeholder for Quiz Section (Static for now) */}
          <div className="card opacity-60 pointer-events-none grayscale animate-fade-in animation-delay-400">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-gray-400" />
                <h2 className="text-2xl font-black text-gray-800">Quiz Analytics</h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-sm font-bold">Coming Soon</span>
            </div>
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-400 italic">Quiz features will appear here in version 2.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;