import React, { useState } from 'react';
import { 
  FiUploadCloud, FiFileText, FiLink, FiCpu, FiSearch, 
  FiCheckCircle, FiShield, FiChevronDown, FiInstagram, 
  FiFacebook, FiLinkedin, FiMoreHorizontal, FiTrash2, FiAlertCircle 
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import './Scan.css';
import { aiService } from '../services/aiService';
import { Turnstile } from '@marsidev/react-turnstile';

const Scan = ({ user, language }) => {
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
    sourceLabel: isID ? "File Source" : "File Source",
    helpText: isID ? "Membantu meningkatkan akurasi deteksi" : "Helps improve detection accuracy",
    exampleTitle: isID ? "Coba Contoh Ini" : "Try These Examples",
    analyzeTitle: isID ? "Apa Yang Kami Analisis" : "What We Analyze",
    scanInstruction: isID 
      ? "Scan yang terproses oleh AI akan memotong kuota. Pastikan file yang diunggah sudah benar agar kuota tidak terbuang percuma." 
      : "Scans processed by AI will consume your quota. Please double-check your file before uploading to avoid wasting scans."
  };

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState("legit");
  const [loading, setLoading] = useState(false);
  const [cfToken, setCfToken] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [scanError, setScanError] = useState("");
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileSource, setFileSource] = useState({ 
    label: isID ? "-- Pilih salah satu --" : "-- Choose one --", 
    value: "", 
    icon: <FiLink /> 
  });

  const sources = [
    { label: "WhatsApp", value: "whatsapp", icon: <FaWhatsapp color="#25D366" /> },
    { label: "Telegram", value: "telegram", icon: <FaTelegramPlane color="#0088cc" /> },
    { label: "Instagram", value: "instagram", icon: <FiInstagram color="#E4405F" /> },
    { label: "Facebook", value: "facebook", icon: <FiFacebook color="#1877F2" /> },
    { label: "LinkedIn", value: "linkedin", icon: <FiLinkedin color="#0A66C2" /> },
    { label: "Other", value: "other", icon: <FiMoreHorizontal color="#64748B" /> },
  ];

  const validateFile = (file) => {
    if (!file) return false;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 
      'image/png', 
      'image/jpg'
    ];

    if (file.size > maxSize) {
      setScanError(isID ? "File terlalu besar! Maksimal 5MB." : "File too large! Maximum 5MB.");
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      setScanError(isID ? "Format tidak didukung! Gunakan PDF, DOCX, JPG, atau PNG." : "Unsupported format! Use PDF, DOCX, JPG, or PNG.");
      return false;
    }
    setScanError("");
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setScanError("");
    // Reset input value to allow re-selecting same file
    const input = document.getElementById("fileInput");
    if (input) input.value = "";
  };

  const handleScan = async () => {
    if (!input && !selectedFile) {
      setScanError(isID ? "Masukkan teks atau upload file dulu!" : "Please provide text or upload a file first!");
      return;
    }
    
    // Check quota if user logged in
    if (user && user.scanLimit <= 0) {
      setScanError(isID ? "Kuota scan Anda habis. Silakan upgrade ke Premium." : "Scan quota exhausted. Please upgrade to Premium.");
      return;
    }

    // Security check for guests
    if (!user && !cfToken) {
      setScanError(isID ? "Verifikasi keamanan diperlukan (Turnstile)." : "Security verification required (Turnstile).");
      return;
    }

    setLoading(true);
    setScanError("");
    try {
      let response;
      const finalSource = fileSource.value || 'other';
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("source", finalSource);
        formData.append("cfToken", cfToken);
        response = await aiService.detectJob(formData, true);
      } else {
        response = await aiService.detectJob({ content: input, source: finalSource, cfToken }, false);
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
      setScanError(errMsg);
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
      <div className="container-verihire-final">

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
          <div className="badge-ui"><FiSearch className="mr-5" /> {t.badge}</div>
          <h1 className="page-title-final">{t.title}</h1>
          <p className="figma-subtitle">{t.subtitle}</p>
        </header>

        {/* SCANNER CARD */}
        <div className="verihire-card-white">
          <div className="card-label-row"><FiFileText className="blue-icon" /> {t.cardLabel}</div>
          <div className="split-box-container">
            <div className="split-box-col">
              <div className="scan-box-tab">{t.tabUploadTitle}</div>
               <div 
                className={`verihire-dropzone ${dragActive ? 'active-drag' : ''}`} 
                onClick={() => document.getElementById("fileInput").click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input id="fileInput" type="file" hidden onChange={handleFileChange} />
                <FiUploadCloud className="cv-cloud-icon" />
                <p>{isID ? "Seret & lepas file di sini atau klik untuk memilih file (PDF/DOCX, Max 5MB)" : "Drag & drop file here or click to select file (PDF/DOCX, Max 5MB)"}</p>
                {selectedFile && (
                  <div className="selected-tag">
                    📄 {selectedFile.name.length > 20 ? selectedFile.name.substring(0, 17) + '...' : selectedFile.name}
                    <button className="btn-remove-file" onClick={removeFile}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="split-divider-v">
              <div className="v-line-divider"></div>
              <div className="v-or-bubble">OR</div>
              <div className="v-line-divider"></div>
            </div>

            <div className="split-box-col">
              <div className="scan-box-tab muted">{t.tabPasteTitle}</div>
              <div className="textarea-wrapper-final">
                <textarea 
                  className="verihire-textarea-final" 
                  placeholder={t.placeholder} 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  maxLength={10000}
                />
                <div className="char-count-final">{input.length.toLocaleString()} / 10,000</div>
              </div>
            </div>
          </div>

          {/* CUSTOM DROPDOWN SOURCE */}
          <div className="source-selection-container">
            <div className="source-header-label"><FiLink className="blue-icon" /> <span>{t.sourceLabel}</span></div>
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
                      {fileSource.value === src.value && src.value !== "" && <FiCheckCircle className="check-icon" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="source-help-text">{t.helpText}</p>
          </div>

          {/* TURNSTILE WIDGET */}
          {!user && (
            <div className="turnstile-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              {console.info("Turnstile Widget Initialized")}
              <Turnstile 
                key={language} // Force re-render if language changes to stay in sync
                siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                onSuccess={(token) => setCfToken(token)}
                onError={(err) => console.error("Turnstile Debug: Widget Error:", err)}
                onExpired={() => {
                  console.info("Turnstile Debug: Token Expired, resetting state.");
                  setCfToken(null);
                }}
              />
            </div>
          )}

          {scanError && (
            <div className="scan-error-msg">
              <FiAlertCircle /> {scanError}
            </div>
          )}

          <button 
            className="btn-scan-figma" 
            onClick={handleScan} 
            disabled={loading || (!user && !cfToken) || (user && user.scanLimit <= 0) || !fileSource.value}
          >
            <FiCpu className="mr-10" /> {loading ? (isID ? "Sedang Memproses..." : "Scanning...") : t.btnScan}
          </button>
          
          <p style={{ 
            fontSize: '12px', 
            color: '#64748B', 
            textAlign: 'center', 
            marginTop: '15px',
            fontStyle: 'italic'
          }}>
            {t.scanInstruction}
          </p>
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
          <h2 className="section-title-final">{t.exampleTitle}</h2>
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