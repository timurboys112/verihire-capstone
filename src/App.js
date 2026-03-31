import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/navbar';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/login';
import Register from './pages/register';
import Chatbot from './components/Chatbot';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('ID');

  // ambil status login dari localStorage
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    if (status === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          language={language}
          setLanguage={setLanguage}
        />

        <div className="content">
          <Routes>

            {/* HOME */}
            <Route 
              path="/" 
              element={<Home isLoggedIn={isLoggedIn} language={language} />} 
            />
            <Route 
              path="/home" 
              element={<Home isLoggedIn={isLoggedIn} language={language} />} 
            />

            {/* LOGIN */}
            <Route 
              path="/login" 
              element={<Login setIsLoggedIn={setIsLoggedIn} language={language} />} 
            />

            {/* REGISTER */}
            <Route 
              path="/register" 
              element={<Register language={language} />} 
            />

            {/* ABOUT */}
            <Route 
              path="/about" 
              element={<About language={language} />} 
            />

            {/* PROTECTED: HISTORY */}
            <Route
              path="/history"
              element={
                isLoggedIn 
                  ? <History language={language} /> 
                  : <Login setIsLoggedIn={setIsLoggedIn} language={language} />
              }
            />

            {/* PROTECTED: PROFILE */}
            <Route
              path="/profile"
              element={
                isLoggedIn 
                  ? <Profile language={language} /> 
                  : <Login setIsLoggedIn={setIsLoggedIn} language={language} />
              }
            />

          </Routes>
        </div>

        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;