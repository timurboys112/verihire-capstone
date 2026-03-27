import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import Profile from './pages/Profile';
import Chatbot from './components/Chatbot'; 

function App() {
  const [page, setPage] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Ganti ke false untuk tes proteksi

  return (
    <div className="App">
      <Navbar 
        setPage={setPage} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />
      
      <div className="content">
        {/* Halaman Home & About bisa dibuka siapa saja */}
        {page === 'Home' && <Home isLoggedIn={isLoggedIn} />}
        {page === 'About' && <About />}

        {/* PROTEKSI: Halaman History hanya untuk yang login */}
        {page === 'History' && (
          isLoggedIn ? <History /> : <Home isLoggedIn={isLoggedIn} />
        )}

        {/* PROTEKSI: Halaman Profile hanya untuk yang login */}
        {page === 'Profile' && (
          isLoggedIn ? <Profile /> : <Home isLoggedIn={isLoggedIn} />
        )}
      </div>

      <Chatbot />
    </div>
  );
}

export default App;