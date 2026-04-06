import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components & Pages
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Scan from './pages/Scan'; 
import Profile from './pages/Profile';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword'; 
import Chatbot from './components/Chatbot';
import ScanCV from './pages/ScanCV';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
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

  return (
    <BrowserRouter>
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
            <Route path="/scan" element={<Scan language={language} />} />
            
            <Route 
              path="/login" 
              element={<Login setUser={setUser} language={language} />} 
            />
            <Route path="/register" element={<Register language={language} />} />
            <Route path="/forgot-password" element={<ForgotPassword language={language} />} />

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

        <Chatbot language={language} />
      </div>
    </BrowserRouter>
  );
}

export default App;