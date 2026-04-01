import React from 'react';

const About = ({ language }) => {
  const content = {
    ID: {
      badge: "🛡️ Tentang VeriHire",
      title: "Melindungi Pencari Kerja dari",
      fraud: "Penipuan",
      stats: [
        { val: "50K+", lab: "Pekerjaan Discan" },
        { val: "99.2%", lab: "Tingkat Akurasi" },
        { val: "15K+", lab: "Pengguna Aktif" },
        { val: "24/7", lab: "Perlindungan" }
      ],
      points: [
        "Janji gaji yang tidak realistis",
        "Metode kontak yang mencurigakan",
        "Tekanan bahasa yang mendesak",
        "Informasi perusahaan yang hilang"
      ]
    },
    EN: {
      badge: "🛡️ About VeriHire",
      title: "Protecting Job Seekers from",
      fraud: "Fraud",
      stats: [
        { val: "50K+", lab: "Jobs Scanned" },
        { val: "99.2%", lab: "Accuracy Rate" },
        { val: "15K+", lab: "Active Users" },
        { val: "24/7", lab: "Protection" }
      ],
      points: [
        "Unrealistic salary promises",
        "Suspicious contact methods",
        "Urgent language pressure",
        "Missing company info"
      ]
    }
  };

  const t = content[language || 'ID'];

  return (
    <div className="about-page-v2">
      <div className="container">
        <span className="badge-ui">{t.badge}</span>
        <h1 className="hero-title">{t.title} <span className="blue-text">{t.fraud}</span></h1>
        
        <div className="about-stats-grid">
          {t.stats.map((s, i) => (
            <div key={i} className="about-stat-card">
              <h3>{s.val}</h3>
              <p>{s.lab}</p>
            </div>
          ))}
        </div>

        <div className="detect-grid-v2">
          {t.points.map((p, i) => (
            <div key={i} className="detect-item">
              <span>●</span> {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;