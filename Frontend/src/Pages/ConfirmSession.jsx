import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar'; 

const Navbar = ({ onNavigate }) => (
  <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
    <div className="font-bold text-xl text-gray-800">PeerPulse</div>
    <button onClick={() => onNavigate && onNavigate('login')} className="text-gray-600 hover:text-gray-900">Logout</button>
  </nav>
);

const ConfirmSessionPage = ({ onNavigate }) => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("currentSession");
    if (data) {
      setSessionData(JSON.parse(data));
    }
  }, []);

  // --- UPDATED: COPY LINK FUNCTION ---
  const handleShareLink = () => {
    if (sessionData?.id) {
      // 1. Construct the full URL (e.g., http://localhost:5173/submit?session_id=123)
      // We use window.location.origin to get your current website address automatically
      const link = `${window.location.origin}/submit-feedback?session_id=${sessionData.id}`;
      
      // 2. Copy to clipboard
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!\n\nSend this to your peers:\n' + link);
    }
  };

  if (!sessionData) {
    return <div className="text-center mt-20">Loading session details...</div>;
  }

  return (
    <div className="min-h-screen bg-background-cream flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <div className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">Session Created Successfully!</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-center font-semibold mb-3">Session Title</label>
            <input
              type="text"
              value={sessionData.title}
              className="w-full px-4 py-3 rounded-lg bg-background-light-gray border-none focus:outline-none"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-center font-semibold mb-3">Session Description</label>
            <textarea
              rows={6}
              value={sessionData.content}
              className="w-full px-4 py-3 rounded-lg bg-background-light-gray border-none focus:outline-none resize-none"
              disabled
            />
          </div>
          
          <div className="pt-4">
            <label className="block text-center font-semibold mb-3">Share this Session</label>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center mb-4">
               <span className="text-gray-500 text-sm">Session ID:</span> <br/>
               <span className="font-mono font-bold text-lg select-all">{sessionData.id}</span>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={handleShareLink}
                className="bg-accent-yellow hover:bg-accent-yellow-dark text-gray-800 font-semibold px-8 py-3 rounded-full transition shadow-md flex items-center gap-2"
              >
                🔗 Copy Share Link
              </button>
            </div>
          </div>

          <div className="flex justify-center">
             <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-500 underline text-sm hover:text-gray-800"
              >
                Back to Dashboard
              </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ConfirmSessionPage;