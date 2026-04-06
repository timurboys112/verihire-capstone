import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png'; 

const Navbar = ({ user, setUser, language, setLanguage }) => {
  const location = useLocation();

  const t = (language === 'EN') ? {
    home: "Home",
    scanJob: "Scan Job",
    scanCV: "Scan CV",
    about: "About",
    login: "Login",
    profile: "Profile",
    logout: "Logout"
  } : {
    home: "Beranda",
    scanJob: "Scan Job",
    scanCV: "Scan CV",
    about: "Tentang",
    login: "Masuk",
    profile: "Profil",
    logout: "Keluar"
  };

  // ✅ tambahin ini (tadi belum ada)
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="main-nav-final">
      <div className="container nav-content-final">
        
        <Link to="/" className="nav-brand-final">
          <img src={logoImg} alt="VeriHire" className="nav-logo-img-final" />
        </Link>

        <div className="nav-right-group-final">
          
          <ul className="nav-menu-final">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">{t.home}</Link>
            </li>

            {/* ✅ FIX disini */}
            <li className={location.pathname === '/scan' ? 'active' : ''}>
              <Link to="/scan">{t.scanJob}</Link>
            </li>

            {/* ✅ TAMBAHAN Scan CV */}
            <li className={location.pathname === '/scan-cv' ? 'active' : ''}>
              <Link to="/scan-cv">{t.scanCV}</Link>
            </li>

            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about">{t.about}</Link>
            </li>
          </ul>

          <div className="nav-lang-final">
            <button 
              className={language === 'EN' ? 'active' : ''} 
              onClick={() => setLanguage('EN')}
            >
              EN
            </button>
            <button 
              className={language === 'ID' ? 'active' : ''} 
              onClick={() => setLanguage('ID')}
            >
              ID
            </button>
          </div>

          <div className="nav-auth-final">
            {user ? (
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