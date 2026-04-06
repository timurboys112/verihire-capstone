import React, { useState } from 'react';
import './Scan.css';

const Scan = ({ language }) => {
  const [input, setInput] = useState("");

  const content = {
    ID: {
      badge: "🔍 Scanner Verifikasi Lowongan",
      title: "Tempel Deskripsi Pekerjaan",
      desc: "AI kami akan menganalisis postingan dan mendeteksi pola penipuan",
      placeholder: "Tempel deskripsi di sini...",
      btnScan: "Scan Sekarang",
      exampleTitle: "Coba Contoh Ini",
      ex1Title: "Risiko Tinggi",
      ex1Text: "URGENT!! Hasilkan $5000/minggu! Kirim biaya $50 via WhatsApp...",
      ex2Title: "Contoh Aman",
      ex2Text: "Senior Engineer di TechCorp. Syarat: Pengalaman 5 tahun...",
      btnUse: "Gunakan Contoh",

      analyzeTitle: "✨ Apa yang Kami Analisis",
      analyzeList: [
        "Janji gaji tidak realistis",
        "Metode kontak mencurigakan",
        "Bahasa mendesak & tekanan",
        "Permintaan biaya atau pembayaran",
        "Deskripsi pekerjaan tidak jelas",
        "Informasi perusahaan tidak lengkap"
      ]
    },
    EN: {
      badge: "🔍 Job Verification Scanner",
      title: "Paste Job Description",
      desc: "Our AI will analyze the posting and detect potential fraud patterns",
      placeholder: "Paste description here...",
      btnScan: "Scan Now",
      exampleTitle: "Try These Examples",
      ex1Title: "High Risk",
      ex1Text: "URGENT!! Earn $5000/week! Send $50 fee via WhatsApp...",
      ex2Title: "Safe Example",
      ex2Text: "Senior Engineer at TechCorp. Requirements: 5 years experience...",
      btnUse: "Use Example",

      analyzeTitle: "✨ What We Analyze",
      analyzeList: [
        "Unrealistic salary promises",
        "Suspicious contact methods",
        "Urgent language and pressure tactics",
        "Payment or fee requests",
        "Vague job descriptions",
        "Missing company information"
      ]
    }
  };

  const t = content[language || 'ID'];

  const handleUseExample = (text) => setInput(text);

  return (
    <div className="scan-page">
      <div className="container">

        {/* HEADER */}
        <div className="scan-header">
          <span className="badge-ui">{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        {/* INPUT */}
        <div className="scan-card">
          <textarea 
            placeholder={t.placeholder} 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          <button className="btn-main">{t.btnScan}</button>
        </div>

        {/* EXAMPLES */}
        <div className="examples-section">
          <h2>{t.exampleTitle}</h2>

          <div className="examples-grid">

            <div className="example-card">
              <div className="example-header red">
                ⚠️ {t.ex1Title}
              </div>
              <p>{t.ex1Text}</p>
              <button onClick={() => handleUseExample(t.ex1Text)}>
                {t.btnUse}
              </button>
            </div>

            <div className="example-card">
              <div className="example-header green">
                ✅ {t.ex2Title}
              </div>
              <p>{t.ex2Text}</p>
              <button onClick={() => handleUseExample(t.ex2Text)}>
                {t.btnUse}
              </button>
            </div>

          </div>
        </div>

        {/* WHAT WE ANALYZE */}
        <div className="analyze-section">
          <h2>{t.analyzeTitle}</h2>

          <div className="analyze-grid">
            {t.analyzeList.map((item, index) => (
              <div key={index} className="analyze-item">
                • {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scan;