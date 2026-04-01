import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png'; 

const Navbar = ({ isLoggedIn, setIsLoggedIn, language, setLanguage }) => {
  const location = useLocation();

  const t = {
    ID: { home: "Beranda", scan: "Scan", about: "Tentang", login: "Masuk", profile: "Profil", logout: "Keluar" },
    EN: { home: "Home", scan: "Scan", about: "About", login: "Login", profile: "Profile", logout: "Logout" }
  }[language || 'ID'];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="main-nav-final">
      <div className="container nav-content-final">
        
        {/* LOGO KIRI */}
        <Link to="/" className="nav-brand-final">
          <img src={logoImg} alt="VeriHire" className="nav-logo-img-final" />
        </Link>

        {/* GRUP KANAN (Menu & Auth) */}
        <div className="nav-right-group-final">
          
          <ul className="nav-menu-final">
            <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">{t.home}</Link></li>
            <li className={location.pathname === '/scan' ? 'active' : ''}><Link to="/scan">{t.scan}</Link></li>
            <li className={location.pathname === '/about' ? 'active' : ''}><Link to="/about">{t.about}</Link></li>
          </ul>

          <div className="nav-lang-final">
            <button className={language === 'EN' ? 'active' : ''} onClick={() => setLanguage('EN')}>EN</button>
            <button className={language === 'ID' ? 'active' : ''} onClick={() => setLanguage('ID')}>ID</button>
          </div>

          <div className="nav-auth-final">
            {isLoggedIn ? (
              <div className="auth-flex-final">
                <Link to="/profile" className="btn-blue-final">{t.profile}</Link>
                <button onClick={handleLogout} className="btn-red-final">{t.logout}</button>
              </div>
            ) : (
              <Link to="/login" className="btn-blue-final">{t.login}</Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;