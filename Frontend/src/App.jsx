import React, { useState } from 'react';
import './App.css';

// Import Pages
import LandingPage from './Pages/Landing';
import CreateSessionPage from './Pages/CreateSession';
import ConfirmSessionPage from './Pages/ConfirmSession';
import SubmitFeedbackPage from './Pages/SubmitFeedback';
import AdminDashboard from './Pages/Dashboard';
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import SessionSelect from './Pages/SessionSelect';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSession, setCurrentSession] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'createSession':
        return <CreateSessionPage onNavigate={setCurrentPage} />;
      case 'confirmSession':
        return <ConfirmSessionPage onNavigate={setCurrentPage} />;
      case 'submitFeedback':
        return <SubmitFeedbackPage onNavigate={setCurrentPage} />;
      case 'selectSession':
        return <SessionSelect onNavigate={setCurrentPage} setCurrentSession={setCurrentSession} />;
      case 'dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} sessionId={currentSession} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;