import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components & Pages
import Navbar from './components/navbar'; // Pastikan huruf besar kecilnya sesuai nama file
import Home from './pages/Home';
import About from './pages/About';
import Scan from './pages/Scan'; 
import Profile from './pages/Profile';
import Login from './pages/login';
import Register from './pages/register';
import Chatbot from './components/Chatbot';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Ambil bahasa terakhir dari storage, kalau gak ada default ke 'ID'
  const [language, setLanguage] = useState(localStorage.getItem("appLang") || 'ID');

  useEffect(() => {
    // Cek status login saat pertama kali buka web
    const status = localStorage.getItem("isLoggedIn");
    if (status === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi tambahan buat simpan pilihan bahasa
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLang", lang);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* NAVBAR: Mengatur login dan switch bahasa */}
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          language={language}
          setLanguage={handleSetLanguage} 
        />

        <div className="content">
          <Routes>
            {/* Halaman Utama */}
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} language={language} />} />
            <Route path="/home" element={<Home isLoggedIn={isLoggedIn} language={language} />} />
            
            {/* Halaman Informasi & Fitur */}
            <Route path="/about" element={<About language={language} />} />
            <Route path="/scan" element={<Scan language={language} />} />
            
            {/* Autentikasi */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} language={language} />} />
            <Route path="/register" element={<Register language={language} />} />

            {/* Proteksi Halaman Profil: Harus login dulu */}
            <Route 
              path="/profile" 
              element={isLoggedIn ? <Profile language={language} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>

        {/* CHATBOT: Sekarang sudah terima props language */}
        <Chatbot language={language} />
      </div>
    </BrowserRouter>
  );
}

export default App;