import React from 'react';

const About = ({ language }) => {

  const content = {
    ID: {
      title: "Tentang Kami",
      desc1: "Kami menyediakan layanan untuk mendeteksi lowongan kerja palsu dengan bantuan AI.",
      desc2: "Kami bertujuan membantu pengguna menghindari penipuan dalam pencarian kerja.",
      stats: [
        "Lowongan Palsu Terdeteksi",
        "Risiko Tinggi Diblokir",
        "Sumber Terbanyak"
      ]
    },
    EN: {
      title: "About Us",
      desc1: "We provide a service to detect fake job vacancies using AI.",
      desc2: "Our goal is to help users avoid scams in job searching.",
      stats: [
        "Fake Jobs Detected",
        "High Risk Blocked",
        "Top Source Detected"
      ]
    }
  };

  const t = content[language || 'ID'];

  return (
    <div className="container about-page">
      <div className="about-header">
        <h2>{t.title}</h2>

        <div className="about-description">
          <p>{t.desc1}</p>
          <p>{t.desc2}</p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span className="icon text-red">⚠️</span>
          <h3>1200 +</h3>
          <p>{t.stats[0]}</p>
        </div>

        <div className="stat-card">
          <span className="icon text-yellow">📈</span>
          <h3>80%</h3>
          <p>{t.stats[1]}</p>
        </div>

        <div className="stat-card">
          <span className="icon">✔️</span>
          <h3>Telegram</h3>
          <p>{t.stats[2]}</p>
        </div>
      </div>
    </div>
  );
};

export default About;