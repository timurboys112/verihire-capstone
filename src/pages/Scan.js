import React, { useState } from 'react';

const Scan = ({ language }) => {
  const [input, setInput] = useState("");

  // OBJEK BAHASA
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
      btnUse: "Gunakan Contoh"
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
      btnUse: "Use Example"
    }
  };

  const t = content[language || 'ID'];

  const handleUseExample = (text) => setInput(text);

  return (
    <div className="scan-ui-v2">
      <div className="container">
        <div className="scan-header">
          <span className="badge-ui">{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <div className="scan-input-card">
          <textarea 
            placeholder={t.placeholder} 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          <button className="btn-main-blue" style={{width: '100%'}}>{t.btnScan}</button>
        </div>

        <div className="examples-section">
          <h3 style={{marginBottom: '20px'}}>{t.exampleTitle}</h3>
          <div className="examples-grid-v2">
            <div className="example-box">
              <div style={{marginBottom: '10px'}}>
                <strong style={{display: 'block'}}>{t.ex1Title}</strong>
              </div>
              <p style={{fontSize: '0.85rem', color: '#64748B'}}>{t.ex1Text}</p>
              <button className="btn-use-example" onClick={() => handleUseExample(t.ex1Text)}>
                {t.btnUse}
              </button>
            </div>

            <div className="example-box">
              <div style={{marginBottom: '10px'}}>
                <strong style={{display: 'block'}}>{t.ex2Title}</strong>
              </div>
              <p style={{fontSize: '0.85rem', color: '#64748B'}}>{t.ex2Text}</p>
              <button className="btn-use-example" onClick={() => handleUseExample(t.ex2Text)}>
                {t.btnUse}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;