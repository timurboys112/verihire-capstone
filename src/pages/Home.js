import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn, language }) => {
  const [scanType, setScanType] = useState('Scan');
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Kamus Bahasa
  const content = {
    ID: {
      title: "Cek Lowongan Kerja, Hindari Penipuan.",
      desc: "Gunakan AI untuk mendeteksi lowongan kerja palsu dalam hitungan detik.",
      placeholder: "Paste lowongan kerja di sini...",
      btnText: "Scan Now",
      limit: "hanya 5 scan tersisa!",
      stats: ["Lowongan Palsu Terdeteksi", "Risiko Tinggi Diblokir", "Sumber Terbanyak"],
      alertEmpty: "Masukkan data dulu!",
      alertDone: "Scan selesai!",
      suspicious: "⚠️ Mencurigakan",
      safe: "✅ Aman"
    },
    EN: {
      title: "Check Job Vacancy, Avoid Scams.",
      desc: "Use AI to detect fake job vacancies in seconds.",
      placeholder: "Paste job vacancy here...",
      btnText: "Scan Now",
      limit: "only 5 scan left!",
      stats: ["Fake Jobs Detected", "High Risk Blocked", "Top Source Detected"],
      alertEmpty: "Please enter data first!",
      alertDone: "Scan complete!",
      suspicious: "⚠️ Suspicious",
      safe: "✅ Safe"
    }
  };

  const t = content[language || 'ID'];

  // LOGIKA SCAN
  const handleScan = () => {
    if (!input) {
      alert(t.alertEmpty);
      return;
    }

    let result = "";
    const text = input.toLowerCase();

    if (
      text.includes("transfer") ||
      text.includes("bayar") ||
      text.includes("admin fee") ||
      text.includes("biaya")
    ) {
      result = t.suspicious;
    } else {
      result = t.safe;
    }

    const newData = {
      id: Date.now(),
      text: input,
      result: result,
      type: scanType,
      date: new Date().toLocaleString(),
    };

    const oldData = JSON.parse(localStorage.getItem("history")) || [];
    const updatedData = [newData, ...oldData];

    localStorage.setItem("history", JSON.stringify(updatedData));

    setInput("");
    alert(t.alertDone);

    navigate("/history");
  };

  return (
    <div className="container">
      <div className="hero-text">
        <h1>{t.title}</h1>
        <p>{t.desc}</p>
      </div>

      <div className="main-search-wrapper">
        <div className="search-box-container">
          <select 
            className="scan-type-select" 
            value={scanType} 
            onChange={(e) => setScanType(e.target.value)}
          >
            <option value="Scan">Scan</option>
            <option value="PDF">PDF</option>
            <option value="Image">Image</option>
            <option value="Link">Link</option>
            <option value="Text">Text</option>
          </select>

          <input 
            type="text" 
            placeholder={t.placeholder} 
            className="scan-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="btn-scan-now" onClick={handleScan}>
            🔍 {t.btnText}
          </button>
        </div>
      </div>

      {!isLoggedIn && <p className="scan-limit-text">{t.limit}</p>}

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

export default Home;