import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn, language, setLanguage }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      
      {/* LOGO */}
      <div 
        className="logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <img src={logo} alt="logo" style={{ height: '70px' }} />
      </div>
      
      {/* MENU */}
      <ul className="nav-links">
        <li onClick={() => navigate('/')}>
          {language === 'ID' ? 'Beranda' : 'Home'}
        </li>
        
        {isLoggedIn ? (
          <>
            <li onClick={() => navigate('/history')}>
              {language === 'ID' ? 'Riwayat' : 'History'}
            </li>
            <li onClick={() => navigate('/about')}>
              {language === 'ID' ? 'Tentang' : 'About'}
            </li>
            <li onClick={() => navigate('/profile')}>
              {language === 'ID' ? 'Profil' : 'Profile'}
            </li>
          </>
        ) : (
          <li onClick={() => navigate('/about')}>
            {language === 'ID' ? 'Tentang' : 'About'}
          </li>
        )}
      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* SWITCH LANGUAGE */}
        <div className="lang">
          <span 
            className={`lang-box ${language === 'EN' ? 'active' : ''}`}
            onClick={() => setLanguage('EN')}
            style={{ cursor: 'pointer' }}
          >
            EN
          </span>

          <span 
            className={`lang-box ${language === 'ID' ? 'active' : ''}`}
            onClick={() => setLanguage('ID')}
            style={{ cursor: 'pointer' }}
          >
            ID
          </span>
        </div>
        
        {/* AUTH */}
        {isLoggedIn ? (
          <div className="auth-buttons">
            <button 
              className="btn-profile" 
              onClick={() => navigate('/profile')}
            >
              {language === 'ID' ? 'Profil' : 'Profile'}
            </button>

            <button 
              className="btn-logout" 
              onClick={() => {
                setIsLoggedIn(false);
                navigate('/');
              }}
            >
              {language === 'ID' ? 'Keluar' : 'Logout'}
            </button>
          </div>
        ) : (
          <button 
            className="btn-login" 
            onClick={() => navigate('/login')}
          >
            {language === 'ID' ? 'Masuk' : 'Login'}
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;