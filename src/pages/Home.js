import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({ language }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const t = {
    ID: {
      badge: "Verifikasi Lowongan Kerja AI",
      title1: "Verify Job Listings",
      title2: "Avoid Scams",
      desc: "Lindungi diri Anda dari tawaran kerja palsu dengan sistem deteksi AI canggih VeriHire.",
      placeholder: "Tempel deskripsi pekerjaan di sini...",
      btnScan: "Scan Now →",
      stats: [
        { val: "1,200+", lab: "Lowongan Palsu", icon: "⚠️" },
        { val: "80%", lab: "Risiko Tinggi", icon: "📈" },
        { val: "Telegram", lab: "Sumber Terbanyak", icon: "🌐" }
      ],
      whyTitle: "Why Choose VeriHire?",
      whyDesc: "Teknologi AI kami melindungi pencari kerja.",
      features: [
        { title: "AI Detection", desc: "Algoritma menganalisis pola penipuan.", icon: "🪄" },
        { title: "Instant Results", desc: "Dapatkan analisis dalam detik.", icon: "⚡" },
        { title: "Stay Protected", desc: "Hindari penipuan dengan cerdas.", icon: "🛡️" }
      ]
    },
    EN: {
      badge: "Job Verification AI",
      title1: "Verify Job Listings",
      title2: "Avoid Scams",
      desc: "Protect yourself from fraudulent job offers with VeriHire's AI.",
      placeholder: "Paste job description here...",
      btnScan: "Scan Now →",
      stats: [
        { val: "1,200+", lab: "Fake Jobs", icon: "⚠️" },
        { val: "80%", lab: "High Risk", icon: "📈" },
        { val: "Telegram", lab: "Top Source", icon: "🌐" }
      ],
      whyTitle: "Why Choose VeriHire?",
      whyDesc: "Our AI technology protects you.",
      features: [
        { title: "AI Detection", desc: "Analyze job postings with ML.", icon: "🪄" },
        { title: "Instant Results", desc: "Get analysis in seconds.", icon: "⚡" },
        { title: "Stay Protected", desc: "Avoid scams easily.", icon: "🛡️" }
      ]
    }
  }[language || 'ID'];

  return (
    <div className="home-wrapper">
      <section className="hero-v2">
        <div className="container">
          <span className="badge-ui">{t.badge}</span>
          <h1 className="hero-title">{t.title1} <br/><span className="blue-text">{t.title2}</span></h1>
          <p className="hero-desc">{t.desc}</p>
          
          <div className="search-bar-v2">
            <div className="input-group">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder={t.placeholder} value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <button className="btn-main-blue" onClick={() => navigate('/scan')}>{t.btnScan}</button>
          </div>

          <div className="stats-grid-v2">
            {t.stats.map((s, i) => (
              <div key={i} className="stat-card-v2">
                <span className="stat-icon">{s.icon}</span>
                <div className="stat-info">
                  <h3>{s.val}</h3>
                  <p>{s.lab}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-us">
        <div className="container">
          <h2 className="section-title">{t.whyTitle}</h2>
          <p className="section-subtitle">{t.whyDesc}</p>
          <div className="features-grid-v2">
            {t.features.map((f, i) => (
              <div key={i} className="feature-box-new">
                <div className="icon-box-v2">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Protect Your Career?</h2>
          <button className="btn-white-pill" onClick={() => navigate('/scan')}>Start Scanning Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;