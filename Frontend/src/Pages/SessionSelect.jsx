import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar'; 
import { Trash2 } from 'lucide-react'; // Import Trash Icon

// Placeholder Navbar
const Navbar = ({ onNavigate }) => (
  <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
    <div className="font-bold text-xl text-gray-800">PeerPulse</div>
    <button 
      onClick={() => onNavigate && onNavigate('login')} 
      className="text-gray-600 hover:text-gray-900"
    >
      Logout
    </button>
  </nav>
);

const SessionSelect = ({ onNavigate, setCurrentSession }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMySessions = async () => {
    const adminId = localStorage.getItem("adminId");
    
    if (!adminId) {
      alert("Please login first!");
      if (onNavigate) onNavigate('login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/get-sessions?creator_id=${adminId}`);
      const data = await response.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySessions();
  }, [onNavigate]); 

  const openSession = (s) => {
    localStorage.setItem("selectedSessionId", s.id); 
    if (setCurrentSession) setCurrentSession(s.id);
    if (onNavigate) onNavigate('dashboard');
  };

  const copyShareLink = (id) => {
    const link = `${window.location.origin}/submit-feedback?session_id=${id}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!\n\n" + link);
    });
  };

  // --- NEW: DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session? This cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/delete-session?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Success! Remove from list immediately
        setSessions(sessions.filter(s => s.id !== id));
        alert("Session deleted.");
      } else {
        alert("Failed to delete session.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />

      <div className="flex-1 px-6 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl text-gray-600 font-bold mb-2">Published Sessions</h1>
          <p className="text-gray-600 mb-6">Select a published session to view its dashboard.</p>

          {loading ? (
             <div className="text-center text-gray-500 py-10">Loading your sessions...</div>
          ) : sessions.length === 0 ? (
             <div className="text-center bg-white p-8 rounded-lg border border-gray-200">
                <p className="text-gray-500 mb-4">You haven't created any sessions yet.</p>
                <button onClick={() => onNavigate && onNavigate('createSession')} className="text-accent-yellow font-bold underline">Create your first one!</button>
             </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div>
                    <div className="font-semibold text-lg text-gray-600">{s.title}</div>
                    <div className="text-xs text-gray-500 mt-1 max-w-md truncate">
                      {s.content}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => openSession(s)} 
                      className="px-5 py-2 rounded-full bg-accent-yellow hover:bg-accent-yellow-dark font-semibold text-gray-800 transition"
                    >
                      Open
                    </button>
                    
                    <button 
                      onClick={() => copyShareLink(s.id)} 
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition font-medium"
                      title="Copy Share Link"
                    >
                      Link
                    </button>

                    {/* DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(s.id)} 
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition"
                      title="Delete Session"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => onNavigate && onNavigate('createSession')} 
              className="px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition font-medium shadow-lg"
            >
              + Create new session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSelect;