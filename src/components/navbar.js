import React from 'react';

const Navbar = ({ setPage, isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage('Home')} style={{ cursor: 'pointer' }}>
        <div className="shield-icon">🛡️</div> VeriHire
      </div>
      
      <ul className="nav-links">
        <li onClick={() => setPage('Home')}>Beranda</li>
        
        {/* Menu History & Profile disembunyikan jika belum login */}
        {isLoggedIn && (
          <>
            <li onClick={() => setPage('History')}>Riwayat</li>
            <li onClick={() => setPage('About')}>Tentang</li>
            <li onClick={() => setPage('Profile')}>Profil</li>
          </>
        )}
        
        {!isLoggedIn && <li onClick={() => setPage('About')}>Tentang</li>}
      </ul>

      <div className="nav-right">
        <div className="lang">
          <span className="lang-box">EN</span>
          <span className="lang-box active">ID</span>
        </div>
        
        {isLoggedIn ? (
          <div className="auth-buttons">
            <button className="btn-profile" onClick={() => setPage('Profile')}>
              Profil
            </button>
            <button className="btn-logout" onClick={() => {
              setIsLoggedIn(false);
              setPage('Home'); // Balik ke home pas logout
            }}>
              Keluar
            </button>
          </div>
        ) : (
          <button className="btn-login" onClick={() => setIsLoggedIn(true)}>Masuk</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;