import React, { useState } from 'react';
import { 
  FiUploadCloud, FiFileText, FiLink, FiCpu, FiSearch, 
  FiCheckCircle, FiShield, FiChevronDown, FiInstagram, 
  FiFacebook, FiLinkedin, FiMoreHorizontal 
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import './Scan.css';
import { aiService } from '../services/aiService';

const Scan = ({ language }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState("legit");
  const [loading, setLoading] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileSource, setFileSource] = useState({ label: "Screenshot", icon: <FaYoutube color="#FF0000" /> });

  const isID = language === 'ID';

  const t = {
    badge: isID ? "Scanner Verifikasi Lowongan" : "Job Verification Scanner",
    title: "Paste Job Description",
    subtitle: isID ? "AI kami akan menganalisis postingan dan mendeteksi pola penipuan" : "Our AI will analyze the posting and detect potential fraud patterns",
    cardLabel: "Job Posting",
    tabUploadTitle: "Upload Document",
    tabPasteTitle: "Paste Text or URL",
    tabPasteSub: isID ? "Ketik atau tempel deskripsi" : "Type or paste your job description",
    dropzoneTxt: "Drag & drop the job description",
    browse: "Browse File",
    supported: "Supported: PDF, DOCX, JPG, PNG (Max 5MB)",
    placeholder: isID ? "Tempel deskripsi lowongan di sini..." : "Paste your job description here...",
    btnScan: isID ? "Scan Sekarang" : "Scan Now",
    sourceLabel: isID ? "File Source (optional)" : "File Source (optional)",
    helpText: isID ? "Membantu meningkatkan akurasi deteksi" : "Helps improve detection accuracy",
    exampleTitle: isID ? "Coba Contoh Ini" : "Try These Examples",
    analyzeTitle: isID ? "Apa Yang Kami Analisis" : "What We Analyze"
  };

  const sources = [
    { label: "Screenshot", icon: <FaYoutube color="#FF0000" /> },
    { label: "WhatsApp", icon: <FaWhatsapp color="#25D366" /> },
    { label: "Telegram", icon: <FaTelegramPlane color="#0088cc" /> },
    { label: "Instagram", icon: <FiInstagram color="#E4405F" /> },
    { label: "Facebook", icon: <FiFacebook color="#1877F2" /> },
    { label: "LinkedIn", icon: <FiLinkedin color="#0A66C2" /> },
    { label: "Other", icon: <FiMoreHorizontal color="#64748B" /> },
  ];

  const handleScan = async () => {
    if (!input && !selectedFile) {
      alert(isID ? "Masukkan teks atau upload file dulu!" : "Please provide text or upload a file first!");
      return;
    }
    setLoading(true);
    try {
      let response;
      const finalSource = fileSource.label ? fileSource.label.toLowerCase() : 'other';
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("source", finalSource);
        response = await aiService.detectJob(formData, true);
      } else {
        response = await aiService.detectJob({ content: input, source: finalSource }, false);
      }

      if (response && response.success) {
        const verdict = response.data?.analysis?.verdict?.toLowerCase() || '';
        if (verdict.includes("legit") || verdict.includes("aman") || verdict.includes("asli") || verdict.includes("low risk")) {
          setResultType("legit");
        } else if (verdict.includes("suspicious") || verdict.includes("mencurigakan") || verdict.includes("medium risk")) {
          setResultType("suspicious");
        } else {
          setResultType("high");
        }
        setShowResult(true);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || (isID ? "Gagal melakukan scan. Coba lagi." : "Failed to scan. Please try again.");
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleUseExample = (text) => {
    setInput(text);
    setSelectedFile(null);
  };

  return (
    <div className="scan-page-wrapper">
      <div className="container-figma">

        {/* ================= MODAL RESULT (FIGMA SYNC) ================= */}
        {showResult && (
          <div className="modal-overlay">
            <div className={`result-card-modern ${resultType}`}>
              <button className="close-btn" onClick={() => setShowResult(false)}>✖</button>
              
              <h1 className={`title ${resultType}`}>
                {resultType === "high" ? "HIGH RISK" : resultType === "suspicious" ? "SUSPICIOUS" : "LEGIT"}
              </h1>
              <p className="subtitle">
                {resultType === "high" ? (isID ? "Analisis AI Mendeteksi Potensi Penipuan" : "AI Detects Potential Fraud") : 
                 resultType === "suspicious" ? (isID ? "Analisis AI Mendeteksi Mempunyai Potensi Penipuan" : "AI Detects Suspicious Patterns") : 
                 (isID ? "Analisis AI Mendeteksi Pekerjaan ini Asli" : "AI Detects This Job as Legit")}
              </p>

              <div className="risk-score-container">
                <div className="risk-label">
                  <span>Risk Score</span>
                  <span>{resultType === "high" ? "85%" : resultType === "suspicious" ? "50%" : "10%"}</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${resultType}`} style={{width: resultType === "high" ? "85%" : resultType === "suspicious" ? "50%" : "10%"}}></div>
                </div>
              </div>

              <div className="info-section-figma">
                <strong>{isID ? "Alasan Deteksi:" : "Detection Reasons:"}</strong>
                <ul>
                  {resultType === "legit" ? (
                    <><li>{isID ? "Gaji realistis" : "Realistic salary"}</li><li>{isID ? "Tidak meminta transfer uang" : "No fee requests"}</li><li>{isID ? "Informasi Perusahaan Jelas" : "Clear company info"}</li><li>{isID ? "Ada Interview" : "Interview process present"}</li></>
                  ) : (
                    <><li>{isID ? "Gaji tidak realistis" : "Unrealistic salary"}</li><li>{isID ? "Meminta transfer uang" : "Requesting money"}</li><li>{isID ? "Info perusahaan tidak jelas" : "Vague company info"}</li><li>{isID ? "Janji kerja tanpa interview" : "Job promise without interview"}</li></>
                  )}
                </ul>
              </div>

              <div className="recom-section-figma">
                <strong>{isID ? "Rekomendasi:" : "Recommendation:"}</strong>
                <div className="recom-box-figma">
                  {resultType === "legit" && (isID ? "Tawaran aman, anda bisa melakukan lamaran." : "Safe offer, you can proceed.")}
                  {resultType === "suspicious" && (isID ? "Tawaran mekhawatirkan, sebaiknya hindari." : "Concerning offer, better to avoid.")}
                  {resultType === "high" && (isID ? "Tolak tawaran ini segera. Terindikasi scam." : "Reject immediately. Indicated as scam.")}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HERO */}
        <header className="scan-hero">
          <div className="scan-badge"><FiSearch className="mr-5" /> {t.badge}</div>
          <h1 className="figma-title">{t.title}</h1>
          <p className="figma-subtitle">{t.subtitle}</p>
        </header>

        {/* SCANNER CARD */}
        <div className="main-white-card">
          <div className="card-label-top"><FiFileText className="blue-icon" /> {t.cardLabel}</div>
          <div className="split-layout">
            <div className="input-column">
              <div className="tab-header-figma active">
                <div className="tab-icon-box"><FiFileText /></div>
                <div className="tab-text"><strong>{t.tabUploadTitle}</strong><small>{t.supported}</small></div>
              </div>
              <div className="figma-dropzone" onClick={() => document.getElementById("fileInput").click()}>
                <input id="fileInput" type="file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                <FiUploadCloud className="cloud-svg" />
                <p>{t.dropzoneTxt} or <span>{t.browse}</span></p>
                {selectedFile && <div className="selected-tag">📄 {selectedFile.name}</div>}
              </div>
            </div>
            <div className="divider-v"><div className="or-bubble">OR</div></div>
            <div className="input-column">
              <div className="tab-header-figma muted">
                <div className="tab-icon-box gray"><FiLink /></div>
                <div className="tab-text"><strong>{t.tabPasteTitle}</strong><small>{t.tabPasteSub}</small></div>
              </div>
              <div className="textarea-container">
                <textarea placeholder={t.placeholder} value={input} onChange={(e) => setInput(e.target.value)} />
                <div className="char-count-figma">{input.length} characters</div>
              </div>
            </div>
          </div>

          {/* CUSTOM DROPDOWN SOURCE */}
          <div className="source-selection-container">
            <div className="source-header-label"><FiLink className="blue-icon" /> <span>{t.sourceLabel}</span> <FiChevronDown /></div>
            <div className="custom-dropdown-figma">
              <div className="dropdown-selected" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="option-content">{fileSource.icon} <span>{fileSource.label}</span></div>
                <FiChevronDown className={`arrow ${isDropdownOpen ? 'open' : ''}`} />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-options-list">
                  {sources.map((src, idx) => (
                    <div key={idx} className="dropdown-item" onClick={() => { setFileSource(src); setIsDropdownOpen(false); }}>
                      <div className="option-content">{src.icon} <span>{src.label}</span></div>
                      {fileSource.label === src.label && <FiCheckCircle className="check-icon" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="source-help-text">{t.helpText}</p>
          </div>

          <button className="btn-scan-figma" onClick={handleScan} disabled={loading}>
            <FiCpu className="mr-10" /> {loading ? "Scanning..." : t.btnScan}
          </button>
        </div>

        {/* 3 SMALL FEATURE CARDS */}
        <div className="features-row-figma">
          <div className="feat-card">
            <div className="tab-icon-box"><FiCpu /></div>
            <div className="feat-text"><strong>AI-Powered Analysis</strong><p>Smart insights to improve your job post</p></div>
          </div>
          <div className="feat-card">
            <div className="tab-icon-box"><FiCheckCircle /></div>
            <div className="feat-text"><strong>ATS-Friendly Tips</strong><p>Optimize for tracking systems</p></div>
          </div>
          <div className="feat-card">
            <div className="tab-icon-box"><FiShield /></div>
            <div className="feat-text"><strong>Fast & Secure</strong><p>Your data is never stored</p></div>
          </div>
        </div>

        {/* TRY THESE EXAMPLES */}
        <div className="examples-section">
          <h2 className="section-title-figma">{t.exampleTitle}</h2>
          <div className="examples-grid-figma">
            <div className="ex-card-figma">
              <div className="ex-head"><strong>High Risk Example</strong> <span className="badge-red">High Risk</span></div>
              <p className="ex-body">URGENT!! Earn $5000/week working from home! No experience needed. Send $50 fee via WhatsApp.</p>
              <button className="btn-use-ex" onClick={() => handleUseExample("URGENT!! Earn $5000/week working from home!")}>Use This Example</button>
            </div>
            <div className="ex-card-figma">
              <div className="ex-head"><strong>Safe Example</strong> <span className="badge-green">Safe</span></div>
              <p className="ex-body">Senior Software Engineer at TechCorp. Developing scalable web applications.</p>
              <button className="btn-use-ex" onClick={() => handleUseExample("Senior Software Engineer at TechCorp.")}>Use This Example</button>
            </div>
          </div>
        </div>

        {/* WHAT WE ANALYZE */}
        <div className="analyze-blue-card">
          <h4><FiSearch className="mr-10" /> {t.analyzeTitle}</h4>
          <div className="analyze-grid-figma">
            <ul>
              <li>Unrealistic salary promises</li>
              <li>Suspicious contact methods</li>
              <li>Urgent language tactics</li>
            </ul>
            <ul>
              <li>Payment or fee requests</li>
              <li>Vague job descriptions</li>
              <li>Missing company info</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scan;