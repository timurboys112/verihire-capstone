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
import Chatbot from './components/Chatbot';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  // Ambil bahasa dari localStorage
  const [language, setLanguage] = useState(localStorage.getItem("appLang") || 'ID');

  // ✅ FIX useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fungsi set bahasa
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLang", lang);
  };

  return (
    <BrowserRouter>
      <div className="App">

        {/* ✅ Navbar pakai user */}
        <Navbar 
          user={user} 
          setUser={setUser}
          language={language}
          setLanguage={handleSetLanguage} 
        />

        <div className="content">
          <Routes>

            {/* Halaman Utama */}
            <Route path="/" element={<Home user={user} language={language} />} />
            <Route path="/home" element={<Home user={user} language={language} />} />
            
            {/* Halaman Lain */}
            <Route path="/about" element={<About language={language} />} />
            <Route path="/scan" element={<Scan language={language} />} />
            
            {/* Auth */}
            <Route 
              path="/login" 
              element={<Login setUser={setUser} language={language} />} 
            />
            <Route path="/register" element={<Register language={language} />} />

            {/* ✅ Proteksi pakai user */}
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} language={language} /> : <Navigate to="/login" />} 
            />

          </Routes>
        </div>

        <Chatbot language={language} />
      </div>
    </BrowserRouter>
  );
}

export default App;