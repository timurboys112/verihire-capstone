import React from 'react';

const About = () => {
  return (
    <div className="container about-page">
      <div className="about-header">
        <h2>About Us</h2>
        <div className="about-description">
          <p>Kami penyedia cek lowongan palsu dengan AI.</p>
          <p>Kami pencetus website pencarian lowongan palsu.</p>
        </div>
      </div>

      {/* Statistik di bagian bawah sesuai prototype About */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="icon text-red">⚠️</span>
          <h3>1200 +</h3>
          <p>Fake Jobs Detected</p>
        </div>
        <div className="stat-card">
          <span className="icon text-yellow">📈</span>
          <h3>80%</h3>
          <p>High Risk Blocked</p>
        </div>
        <div className="stat-card">
          <span className="icon">✔️</span>
          <h3>Telegram</h3>
          <p>Top Source Detected</p>
        </div>
      </div>
    </div>
  );
};

export default About;