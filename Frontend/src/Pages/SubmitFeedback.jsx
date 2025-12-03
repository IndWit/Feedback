import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar'; // Uncomment in local project
import { Star, AlertCircle, Send, MessageSquare, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';

// Placeholder Navbar to ensure code compiles without the external file
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
      </button>
      {onNavigate && (
        <button onClick={() => onNavigate('login')} className="btn-secondary">
          Login
        </button>
      )}
    </div>
  </nav>
);

const SubmitFeedbackPage = ({ onNavigate }) => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackLevel, setFeedbackLevel] = useState(''); // Stores Excellent, Good, Bad, etc.
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('loading'); // loading, ready, submitting, success, error

  // 1. ON LOAD: READ URL & FETCH DETAILS
  useEffect(() => {
    const fetchSessionInfo = async () => {
      // Get ID from URL (e.g. ?session_id=12345)
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/get-sessions?id=${sessionId}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setSessionDetails(data[0]); 
          setStatus('ready');
        } else {
          setStatus('error'); 
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setStatus('error');
      }
    };

    fetchSessionInfo();
  }, []);

  // 2. HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!feedback || !feedbackLevel || rating === 0) {
      alert('Please fill in all fields (Rating, Feedback, and Level)!');
      return;
    }

    setStatus('submitting');

    try {
      // We format the comment to include the level since backend only has 'comment'
      const finalComment = `[Level: ${feedbackLevel}] ${feedback}`;

      const response = await fetch("http://localhost:8080/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionDetails.id,
          rating: rating,
          comment: finalComment
        })
      });

      if (response.ok) {
        setStatus('success');
        setFeedback('');
        setFeedbackLevel('');
        setRating(0);
      } else {
        alert("Something went wrong. Please try again.");
        setStatus('ready');
      }
    } catch (error) {
      console.error(error);
      alert("Connection error. Is the backend running?");
      setStatus('ready');
    }
  };

  // --- UI STATES (Loading / Error / Success) ---

  if (status === 'loading') {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="glass-strong rounded-3xl p-12 shadow-strong text-center animate-pulse">
          <div className="w-16 h-16 rounded-full bg-accent-yellow/20 mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-accent-yellow-dark" />
          </div>
          <p className="text-lg text-gray-700 font-semibold">Loading session...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen gradient-mesh flex flex-col items-center justify-center p-4">
        <div className="glass-strong rounded-3xl p-12 shadow-strong text-center max-w-md animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-red-100 mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Session Not Found</h1>
          <p className="text-gray-600 text-lg mb-6">The link might be broken or the session has been deleted.</p>
          {onNavigate && (
            <button onClick={() => onNavigate('login')} className="btn-primary">
              Go Home
            </button>
          )}
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen gradient-mesh flex flex-col">
        <Navbar onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="glass-strong rounded-3xl p-12 shadow-strong text-center max-w-md animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping"></div>
              <CheckCircle className="w-14 h-14 text-green-600 relative z-10" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-8">Your feedback has been sent anonymously and helps improve the team.</p>
            <button onClick={() => setStatus('ready')} className="btn-primary">
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN FORM ---
  return (
    <div className="min-h-screen gradient-mesh flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 section">
        <div className="container-custom max-w-4xl">
          {/* Header Section: Shows Real Session Details */}
          <div className="glass-strong rounded-3xl overflow-hidden mb-8 shadow-strong animate-slide-up relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 via-orange/10 to-accent-yellow/10"></div>
            <div className="relative z-10 p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-accent-yellow/30 mb-6">
                <Sparkles className="w-4 h-4 text-accent-yellow-dark" />
                <span className="text-sm font-bold text-gray-700">Anonymous Feedback</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                {sessionDetails.title}
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">{sessionDetails.content}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            
            {/* Star Rating Section */}
            <div className="card text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-accent-yellow-dark" />
                <label className="text-gray-700 font-bold text-lg">Rate Your Experience</label>
              </div>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transform transition-all hover:scale-125 focus:outline-none group"
                  >
                    <Star 
                      className={`w-12 h-12 transition-all ${
                        star <= rating 
                          ? 'fill-accent-yellow text-accent-yellow scale-110' 
                          : 'text-gray-300 group-hover:text-accent-yellow/50'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-500 mt-4 animate-fade-in">
                  You rated: <span className="font-bold text-accent-yellow-dark">{rating} star{rating > 1 ? 's' : ''}</span>
                </p>
              )}
            </div>

            {/* Feedback Text Area */}
            <div className="card animate-fade-in animation-delay-100">
              <label className="block text-gray-700 font-bold text-lg mb-3">Your Feedback</label>
              <textarea
                placeholder="Share your honest thoughts here... Your feedback is completely anonymous and helps improve the team."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={8}
                className="input resize-none"
              />
            </div>
            
            {/* Feedback Level Dropdown */}
            <div className="card text-center animate-fade-in animation-delay-200">
              <label className="block text-gray-700 font-bold text-lg mb-4">Overall Assessment</label>
              <select
                value={feedbackLevel}
                onChange={(e) => setFeedbackLevel(e.target.value)}
                className="input max-w-xs mx-auto text-center font-bold cursor-pointer"
                style={{
                  color: feedbackLevel === 'Excellent' ? '#059669' : 
                         feedbackLevel === 'Good' ? '#10b981' : 
                         feedbackLevel === 'Fair' ? '#f59e0b' : 
                         feedbackLevel === 'Poor' ? '#ef4444' : 
                         feedbackLevel === 'Bad' ? '#dc2626' : '#374151'
                }}
              >
                <option value="" className="text-gray-700">Select Level</option>
                <option value="Excellent" className="text-green-700 font-bold">Excellent</option>
                <option value="Good" className="text-green-600 font-bold">Good</option>
                <option value="Fair" className="text-amber-500 font-bold">Fair</option>
                <option value="Poor" className="text-red-500 font-bold">Poor</option>
                <option value="Bad" className="text-red-600 font-bold">Bad</option>
              </select>
            </div>
            
            <div className="flex justify-center pt-4 animate-fade-in animation-delay-300">
              <button 
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                className="btn-primary text-xl px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {status === 'submitting' ? (
                  <>
                    <span>Submitting...</span>
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <span>Submit Feedback</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedbackPage;