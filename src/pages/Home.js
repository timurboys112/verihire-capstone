import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiSearch, FiFileText, FiShield, FiZap, FiTarget } from "react-icons/fi";

const Home = ({ language, user }) => { // ✅ Terima prop user
  const navigate = useNavigate();
  const isID = language === 'ID';

  const t = {
    badge: isID ? "Verifikasi Lowongan Kerja AI" : "Job Verification AI",
    title1: "Verify Jobs &",
    title2: "Avoid Scams",
    subtitle: isID ? "Bangun CV yang lebih kuat dengan percaya diri" : "Build a Stronger CV with Confidence",
    desc: isID 
      ? "Lindungi diri Anda dari tawaran kerja palsu dengan sistem deteksi AI canggih VeriHire. Dapatkan analisis instan dan tetap aman dalam pencarian kerja Anda."
      : "Protect yourself from fraudulent job offers with VeriHire's advanced AI detection system. Get instant analysis and stay safe in your job search.",
    btnJob: isID ? "Scan Lowongan Sekarang" : "Scan Job Now",
    btnCV: isID ? "Scan CV Anda Sekarang" : "Scan your CV Now",
    stats: [
      { val: "1,200+", lab: isID ? "Loker Palsu Terdeteksi" : "Fake Jobs Detected", icon: "🚫", color: "red" },
      { val: "80%", lab: isID ? "Risiko Tinggi Ditemukan" : "High Risk Found", icon: "📈", color: "orange" },
      { val: "Telegram", lab: isID ? "Sumber Terbanyak" : "Top Source Platform", icon: "🌐", color: "blue" }
    ],
    whyTitle: "Why Choose VeriHire?",
    whyDesc: isID ? "Teknologi AI canggih kami melindungi pencari kerja dari postingan palsu" : "Our advanced AI technology protects job seekers from fraudulent listings",
    features: [
      { title: "AI-Powered Detection", desc: isID ? "Algoritma machine learning menganalisis pola penipuan." : "Advanced machine learning algorithms analyze job postings for fraud patterns.", icon: <FiTarget /> },
      { title: "Instant Results", desc: isID ? "Dapatkan analisis penipuan komprehensif dalam hitungan detik." : "Get comprehensive fraud analysis in seconds with detailed risk breakdowns.", icon: <FiZap /> },
      { title: "Stay Protected", desc: isID ? "Hindari penipuan dengan sistem verifikasi cerdas kami." : "Avoid scams and fraudulent job offers with our intelligent verification system.", icon: <FiShield /> }
    ]
  };

  // ✅ Logika Klik Scan CV - Versi Tanpa Alert (Sesuai Request PM)
  const handleScanCV = () => {
    if (!user) {
      navigate('/register');
    } else {
      navigate('/scan-cv');
    }
  };

  return (
    <div className="home-wrapper">
      <section className="hero-v3">
        <div className="container">
          <h1 className="hero-title-v3">
            {t.title1} <span className="blue-text">{t.title2}</span>
          </h1>
          <h3 className="hero-subtitle-v3">{t.subtitle}</h3>
          <p className="hero-desc-v3">{t.desc}</p>
          
          <div className="hero-action-btns">
            <button className="btn-hero-blue" onClick={() => navigate('/scan')}>
              <FiSearch className="mr-10" /> {t.btnJob}
            </button>
            <button className="btn-hero-outline" onClick={handleScanCV}>
              <FiFileText className="mr-10" /> {t.btnCV}
            </button>
          </div>

          <div className="stats-container-v3">
            {t.stats.map((s, i) => (
              <div key={i} className={`stat-card-v3 ${s.color}`}>
                <div className="stat-icon-circle">{s.icon}</div>
                <div className="stat-content">
                  <h3>{s.val}</h3>
                  <p>{s.lab}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-us-v3">
        <div className="container">
          <h2 className="section-title-v3">{t.whyTitle}</h2>
          <p className="section-subtitle-v3">{t.whyDesc}</p>
          
          <div className="features-grid-v3">
            {t.features.map((f, i) => (
              <div key={i} className="feat-box-v3">
                <div className="feat-icon-v3">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section-v3">
        <div className="container">
          <h2>Ready to Protect Your Career?</h2>
          <p>Join thousands of job seekers who trust VeriHire to keep them safe from scams</p>
          <button className="btn-white-pill-v3" onClick={() => navigate('/scan')}>
            Start Scanning Now 
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;