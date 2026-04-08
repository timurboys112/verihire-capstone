import React, { useState } from 'react';
import { FiUploadCloud, FiFileText, FiLink, FiCpu, FiSearch, FiCheckCircle, FiShield } from 'react-icons/fi';
import './Scan.css';


const Scan = ({ language }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState("legit");
  const [loading, setLoading] = useState(false);

  const isID = language === 'ID';

  const t = {
    badge: isID ? "Scanner Verifikasi Lowongan" : "Job Verification Scanner",
    title: isID ? "Tempel Deskripsi Pekerjaan" : "Paste Job Description",
    subtitle: isID ? "AI kami akan menganalisis postingan dan mendeteksi pola penipuan" : "Our AI will analyze the posting and detect potential fraud patterns",
    cardLabel: isID ? "Postingan Lowongan" : "Job Posting",
    tabUploadTitle: isID ? "Unggah Dokumen" : "Upload Document",
    tabPasteTitle: isID ? "Tempel Teks" : "Paste Text",
    tabPasteSub: isID ? "Ketik atau tempel deskripsi" : "Type or paste your job description",
    dropzoneTxt: isID ? "Tarik & lepas deskripsi lowongan" : "Drag & drop the job description",
    browse: isID ? "Pilih File" : "Browse File",
    supported: isID ? "Mendukung: PDF, DOCX, JPG, PNG (Maks 5MB)" : "Supported: PDF, DOCX, JPG, PNG (Max 5MB)",
    placeholder: isID ? "Tempel deskripsi lowongan di sini..." : "Paste your job description here...",
    btnScan: isID ? "Scan Sekarang" : "Scan Now",
  };

  const handleScan = async () => {
    if (!input && !selectedFile) {
      alert("Masukkan teks atau upload file dulu!");
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      formData.append("text", input);
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const result = (data.result || "legit").toLowerCase();

      setResultType(result);
      setShowResult(true);

    } catch (error) {
      console.error(error);
      setResultType("high");
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-page-wrapper">
      <div className="container-figma">

{/* 🔥 POPUP CLEAN */}
{showResult && (
  <div className="modal-overlay">
    <div className={`result-card-modern ${resultType}`}>

      <button 
        className="close-btn" 
        onClick={() => setShowResult(false)}
      >
        ✖
      </button>

      {/* TITLE */}
      <h2 className={`title ${resultType}`}>
        {resultType === "high" && "HIGH RISK"}
        {resultType === "suspicious" && "SUSPICIOUS"}
        {resultType === "legit" && "LEGIT"}
      </h2>

      <p className="subtitle">
        {resultType === "high" && "Analisis AI Mendeteksi Potensi Penipuan"}
        {resultType === "suspicious" && "Analisis AI Mendeteksi Mempunyai Potensi Penipuan"}
        {resultType === "legit" && "Analisis AI Mendeteksi Pekerjaan ini Asli"}
      </p>

      {/* RISK */}
      <div className="risk-row">
        <span>Risk Score</span>
        <span>
          {resultType === "high" && "85%"}
          {resultType === "suspicious" && "50%"}
          {resultType === "legit" && "10%"}
        </span>
      </div>

      <div className="progress-bar">
        <div 
          className={`progress-fill ${resultType}`} 
          style={{
            width:
              resultType === "high"
                ? "85%"
                : resultType === "suspicious"
                ? "50%"
                : "10%"
          }}
        />
      </div>

      {/* ALASAN */}
      <div className="info-box">
        <p className="section-title">Alasan Deteksi:</p>

        {resultType === "high" && (
          <ul>
            <li>Gaji tidak realistis</li>
            <li>Meminta transfer uang</li>
            <li>Tidak ada info perusahaan</li>
            <li>Tanpa interview</li>
          </ul>
        )}

        {resultType === "suspicious" && (
          <ul>
            <li>Gaji mencurigakan</li>
            <li>Berpotensi meminta uang</li>
            <li>Info kurang jelas</li>
            <li>Proses tidak transparan</li>
          </ul>
        )}

        {resultType === "legit" && (
          <ul>
            <li>Gaji realistis</li>
            <li>Tidak ada biaya</li>
            <li>Perusahaan jelas</li>
            <li>Ada interview</li>
          </ul>
        )}
      </div>

      {/* REKOMENDASI */}
      <div className="info-box">
        <p className="section-title">Rekomendasi:</p>

        {resultType === "high" && (
          <p>Tolak tawaran ini, terindikasi scam.</p>
        )}

        {resultType === "suspicious" && (
          <p>Hati-hati, lakukan pengecekan lebih lanjut.</p>
        )}

        {resultType === "legit" && (
          <p>Aman untuk dilanjutkan.</p>
        )}
      </div>

    </div>
  </div>
)}

        {/* HEADER */}
        <header className="scan-hero">
          <div className="scan-badge">
            <FiSearch className="mr-5" /> {t.badge}
          </div>
          <h1 className="figma-title">{t.title}</h1>
          <p className="figma-subtitle">{t.subtitle}</p>
        </header>

        {/* MAIN CARD */}
        <div className="main-white-card">
          <div className="card-label-top">
            <FiFileText className="blue-icon" /> {t.cardLabel}
          </div>

          <div className="split-layout">
            {/* UPLOAD */}
            {/* UPLOAD */}
<div className="input-column">
  <div className="tab-header-figma active">
    <div className="tab-icon-box"><FiFileText /></div>
    <div className="tab-text">
      <strong>{t.tabUploadTitle}</strong>
      <small>PDF, DOCX, JPG, PNG (Max 5MB)</small>
    </div>
  </div>

  <div 
    className="figma-dropzone"
    onClick={() => document.getElementById("fileInput").click()}
  >
    <input
      id="fileInput"
      type="file"
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      hidden
      onChange={(e) => {
        const file = e.target.files[0];

        if (!file) return;

        // 🔥 VALIDASI SIZE (MAX 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("File terlalu besar! Maksimal 5MB");
          return;
        }

        setSelectedFile(file);
        setInput(""); // reset text kalau upload file
      }}
    />

    <FiUploadCloud className="cloud-svg" />
    <p>
      {t.dropzoneTxt} <br /> 
      <span style={{ color: "#4f7cff", cursor: "pointer" }}>
        {t.browse}
      </span>
    </p>

    <small className="muted-text">{t.supported}</small>

    {selectedFile && (
      <div className="selected-tag">
        📄 {selectedFile.name}
      </div>
    )}
  </div>
</div>



            <div className="divider-v">
              <div className="or-bubble">OR</div>
            </div>

            {/* TEXT */}
            <div className="input-column">
              <div className="tab-header-figma muted">
                <div className="tab-icon-box gray"><FiLink /></div>
                <div className="tab-text">
                  <strong>{t.tabPasteTitle}</strong>
                  <small>{t.tabPasteSub}</small>
                </div>
              </div>

              <div className="textarea-container">
                <textarea
                  placeholder={t.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="char-count-figma">{input.length} characters</div>
              </div>
            </div>
          </div>

          <button className="btn-scan-figma" onClick={handleScan}>
            <FiCpu className="mr-10" />
            {loading ? "Scanning..." : t.btnScan}
          </button>
        </div>

{showResult && (
  <div className="result-box">
    <h3>Hasil Scan:</h3>
    <p>
      {resultType === "high"
        ? "⚠️ High Risk (Kemungkinan Penipuan)"
        : "✅ Aman / Legit"}
    </p>
  </div>
)}

        {/* 🔥 FEATURES (INI YANG KAMU TAMBAHIN) */}
        <div className="features-grid-row">
          <div className="feature-small-card">
            <div className="feat-icon-blue"><FiCpu /></div>
            <div className="feat-text">
              <strong>AI-Powered Analysis</strong>
              <p>{isID ? "Wawasan cerdas untuk CV Anda" : "Smart insights to improve your CV"}</p>
            </div>
          </div>

          <div className="feature-small-card">
            <div className="feat-icon-blue"><FiCheckCircle /></div>
            <div className="feat-text">
              <strong>ATS-Friendly Tips</strong>
              <p>{isID ? "Optimalkan untuk sistem pelacakan" : "Optimize for applicant tracking systems"}</p>
            </div>
          </div>

          <div className="feature-small-card">
            <div className="feat-icon-blue"><FiShield /></div>
            <div className="feat-text">
              <strong>Fast & Secure</strong>
              <p>{isID ? "Data Anda tidak pernah disimpan" : "Your data is never stored"}</p>
            </div>
          </div>
        </div>

<div className="examples-section">

  <h2 className="examples-title">Try These Examples</h2>

  <div className="examples-grid">
    {/* HIGH RISK */}
    <div className="example-card">
      <div className="example-header">
        <strong>High Risk Example</strong>
        <span className="badge red">High Risk</span>
      </div>

      <p className="example-text">
        URGENT!!! Earn $5000/week working from home! No experience needed. 
        Just send $50 registration fee to WhatsApp +1234567890. Get paid daily via Bitcoin!
      </p>

      <button className="example-btn">Use This Example</button>
    </div>

    {/* SAFE */}
    <div className="example-card">
      <div className="example-header">
        <strong>Safe Example</strong>
        <span className="badge green">Safe</span>
      </div>

      <p className="example-text">
        Senior Software Engineer at TechCorp  
        Responsibilities: Develop scalable web applications, collaborate with teams, mentor junior developers.
      </p>

      <button className="example-btn">Use This Example</button>
    </div>
  </div>

  {/* WHAT WE ANALYZE */}
  <div className="analyze-box">
    <h3>✨ What We Analyze</h3>

    <div className="analyze-grid">
      <ul>
        <li>Unrealistic salary promises</li>
        <li>Suspicious contact methods</li>
        <li>Urgent language and pressure tactics</li>
      </ul>

      <ul>
        <li>Payment or fee requests</li>
        <li>Vague job descriptions</li>
        <li>Missing company information</li>
      </ul>
    </div>
  </div>

</div>

      </div>
    </div>
  );
};

export default Scan;