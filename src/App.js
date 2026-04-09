import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components & Pages
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Scan from './pages/Scan'; 
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword';
import Chatbot from './components/Chatbot';
import ScanCV from './pages/ScanCV';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function MainApp() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem("appLang") || 'ID');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLang", lang);
  };

  const location = useLocation();
  const isAuthPage = 
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/reset-password');

  return (
    <div className="App">
        <Navbar 
          user={user} 
          setUser={setUser}
          language={language}
          setLanguage={handleSetLanguage} 
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home user={user} language={language} />} />
            <Route path="/home" element={<Home user={user} language={language} />} />
            
            <Route path="/about" element={<About language={language} />} />
            <Route path="/scan" element={<Scan user={user} language={language} />} />
            
            <Route 
              path="/login" 
              element={<Login setUser={setUser} language={language} />} 
            />
            <Route path="/register" element={<Register language={language} />} />
            <Route path="/forgot-password" element={<ForgotPassword language={language} />} />
            <Route path="/reset-password/:token" element={<ResetPassword language={language} />} />

            {/* ✅ PROTECTED: Profile */}
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} language={language} /> : <Navigate to="/login" />} 
            />

            {/* ✅ PROTECTED: Scan CV (Pindah ke Register kalau belum login) */}
            <Route 
              path="/scan-cv" 
              element={user ? <ScanCV language={language} /> : <Navigate to="/register" />} 
            />

          </Routes>
        </div>

        {!isAuthPage && <Chatbot language={language} user={user} />}
      </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;