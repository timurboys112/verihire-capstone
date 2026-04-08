import React, { useState } from 'react';
import { 
  FiUploadCloud, FiFileText, FiCheckCircle, FiCpu, 
  FiShield, FiSearch, FiX, FiCheck, FiTarget, FiInfo, FiBriefcase 
} from 'react-icons/fi';
import './ScanCV.css';

function ScanCV({ language, user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
  const [targetJob, setTargetJob] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dynamicData, setDynamicData] = useState(null);
  
  const isID = language === 'ID';

  const t = {
    badge: isID ? "Halaman Scan CV" : "Scan Page CV",
    title: isID ? "Scan CV Anda" : "Scan Your CV",
    subtitle: isID ? "Unggah CV Anda untuk meningkatkan peluang dalam lamaran kerja" : "Upload your CV to improve your chances in job applications",
    cardLabel: isID ? "Unggah CV" : "CV Upload",
    tabUpload: isID ? "Unggah Dokumen" : "Upload Document",
    tabPaste: isID ? "Tempel Teks" : "Paste Text",
    btnScan: isID ? "Scan CV Sekarang" : "Scan Your CV Now",
    targetPlaceholder: isID ? "Masukkan Pekerjaan Target Anda..." : "Input Your Target Job...",
    mTitle: isID ? "Hasil Scan CV" : "CV Scan Results",
    mScore: isID ? "Skor CV" : "CV Score",
    mStrength: isID ? "Kekuatan" : "Strengths",
    mWeakness: isID ? "Kelemahan" : "Weaknesses",
    mAdvice: isID ? "Saran Perbaikan" : "Improvement Advice",
    mRephrase: isID ? "Saran Kalimat" : "Rephrase Suggestions",
    mJobRec: isID ? "Rekomendasi Pekerjaan" : "Job Recommendations",
    howItWorks: isID ? "Cara Kerja" : "How It Works"
  };

  const handleScan = () => {
    if (!pastedText && !selectedFile) {
      alert(isID ? "Tolong masukkan CV atau upload file!" : "Please provide CV text or upload a file!");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const text = pastedText.toLowerCase();
      let res = {};

      if (text.includes("john") || text.includes("senior")) {
        res = {
          score: 95, status: "excellent",
          matchTitle: isID ? "Sangat Cocok" : "Excellent Match",
          matchDesc: isID ? "CV Anda beneran mantap buat posisi ini!" : "Your CV is perfectly aligned for this role!",
          advice: isID ? "Sempurna! Tinggal lamar aja ini mah." : "Perfect! Just go ahead and apply.",
          strengths: ["Expert React & Node.js", "5+ Years Experience", "System Design"],
          weaknesses: [isID ? "Tidak ada" : "None"],
          rephrase: ["Optimize keywords for ATS", "Use impact-driven metrics"],
          jobs: ["Lead Engineer", "Solutions Architect"]
        };
      } else if (text.includes("budi") || text.includes("chef") || text.includes("culinary")) {
        res = {
          score: 20, status: "low",
          matchTitle: isID ? "Kurang Cocok" : "Low Match",
          matchDesc: isID ? "Bidang kuliner agak jauh nih dari target IT." : "Culinary background doesn't match IT targets.",
          advice: isID ? "Coba ambil bootcamp IT dulu kalau mau pindah haluan." : "Try taking IT bootcamps if you want to switch careers.",
          strengths: ["Management Skills", "Fast Learner"],
          weaknesses: ["No Technical IT Experience", "Irrelevant Industry"],
          rephrase: ["Focus on transferable soft skills", "Add IT certifications"],
          jobs: ["Kitchen Manager", "Operations Lead"]
        };
      } else {
        res = {
          score: 55, status: "medium",
          matchTitle: isID ? "Kecocokan Menengah" : "Medium Match",
          matchDesc: isID ? "CV Anda oke, tapi masih ada yang kurang dikit." : "Your CV is good, but needs more polish.",
          advice: isID ? "Tambahkan detail pencapaian yang ada angkanya." : "Add quantifiable achievements with numbers.",
          strengths: ["Basic Tech Stack", "Clean Layout"],
          weaknesses: ["No Cloud Platform exp", "Missing Scrum keywords"],
          rephrase: ["Use 'Implemented' instead of 'Made'", "Add action verbs"],
          jobs: ["Frontend Developer", "Web Programmer"]
        };
      }
      
      setDynamicData(res);
      setShowModal(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="scan-cv-wrapper-final">
      <div className="container-cv-figma">

        {/* MODAL RESULT (RESPONSIVE FIX) */}
        {showModal && dynamicData && (
          <div className="cv-modal-overlay">
            <div className={`cv-modal-card ${dynamicData.status}`}>
              <button className="cv-close-x" onClick={() => setShowModal(false)}><FiX /></button>
              <h2 className="cv-modal-title">{t.mTitle}</h2>

              <div className="cv-score-header">
                <div className="cv-score-visual">
                  <span className="cv-score-tag">{t.mScore}</span>
                  <div className="cv-score-circle">{dynamicData.score}</div>
                  <span className={`cv-status-badge ${dynamicData.status}`}>
                    {dynamicData.status.toUpperCase()}
                  </span>
                </div>
                <div className="cv-user-info">
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" className="cv-avatar-fix" />
                  <div className="cv-user-text">
                    <h3>{pastedText.includes("john") ? "John Doe" : pastedText.includes("budi") ? "Budi Santoso" : "User Applicant"}</h3>
                    <p>Target: <span>{targetJob || "Software Engineer"}</span></p>
                  </div>
                </div>
              </div>

              <div className="cv-result-grid">
                <div className="cv-result-item match-accent">
                  <h4 className="green-txt"><FiCheckCircle /> {dynamicData.matchTitle}</h4>
                  <p>{dynamicData.matchDesc}</p>
                </div>
                <div className="cv-result-item">
                  <h4 className="blue-txt"><FiCheck /> {t.mStrength}</h4>
                  <ul>{dynamicData.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
                <div className="cv-result-item">
                  <h4 className="blue-txt"><FiInfo /> {t.mAdvice}</h4>
                  <p>{dynamicData.advice}</p>
                </div>
                <div className="cv-result-item">
                  <h4 className="orange-txt"><FiShield /> {t.mWeakness}</h4>
                  <ul>{dynamicData.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
                </div>
                <div className="cv-result-item full-width">
                  <h4 className="green-txt"><FiCheckCircle /> {t.mRephrase}</h4>
                  <ul>{dynamicData.rephrase.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
                <div className="cv-result-item full-width job-rec-box">
                  <h4 className="blue-txt"><FiBriefcase /> {t.mJobRec}</h4>
                  <ul>{dynamicData.jobs.map((j, i) => <li key={i}>{j}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* HERO */}
        <div className="cv-hero">
          <div className="cv-badge-top"><FiSearch className="mr-5" /> {t.badge}</div>
          <h1 className="cv-title-main">{t.title}</h1>
          <p className="cv-sub-main">{t.subtitle}</p>
        </div>

        {/* MAIN CARD */}
        <div className="cv-card-white">
          <div className="cv-card-label"><FiFileText className="blue-icon" /> {t.cardLabel}</div>
          <div className="cv-split-box">
            <div className="cv-input-col">
              <div className="cv-tab active">{t.tabUpload}</div>
              <div className="cv-dropzone" onClick={() => document.getElementById('f-input').click()}>
                <input type="file" id="f-input" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                <FiUploadCloud className="cv-cloud-icon" />
                <p>{isID ? "Tarik file" : "Drag file"} or <span>Browse</span></p>
                {selectedFile && <div className="cv-file-tag">✅ {selectedFile.name}</div>}
              </div>
            </div>
            <div className="cv-divider-v"><div className="v-line"></div><div className="v-or">OR</div><div className="v-line"></div></div>
            <div className="cv-input-col">
              <div className="cv-tab gray">{t.tabPaste}</div>
              <textarea className="cv-textarea" value={pastedText} onChange={(e) => setPastedText(e.target.value)} placeholder="..." />
            </div>
          </div>
          <input type="text" className="cv-target-input" placeholder={t.targetPlaceholder} value={targetJob} onChange={(e) => setTargetJob(e.target.value)} />
          <button className="cv-btn-scan" onClick={handleScan} disabled={loading}>
            <FiCpu className="mr-10" /> {loading ? "Analyzing..." : t.btnScan}
          </button>
        </div>

        {/* FEATURE CARDS */}
        <div className="cv-features-row">
          <div className="feat-small-card">
            <FiCpu className="feat-icon-blue" />
            <div className="feat-text"><strong>AI-Powered Analysis</strong><p>Smart insights to improve CV</p></div>
          </div>
          <div className="feat-small-card">
            <FiCheckCircle className="feat-icon-blue" />
            <div className="feat-text"><strong>ATS-Friendly Tips</strong><p>Optimize for systems</p></div>
          </div>
          <div className="feat-small-card">
            <FiShield className="feat-icon-blue" />
            <div className="feat-text"><strong>Fast & Secure</strong><p>Data is never stored</p></div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="cv-how-it-works">
          <h2 className="how-title"><FiCheckCircle className="blue-icon" /> {t.howItWorks}</h2>
          <div className="how-grid">
            <div className="how-steps">
              <div className="step">
                <div className="s-num">1</div>
                <div className="s-txt"><strong>Upload CV</strong><p>PDF/DOCX or plain text.</p></div>
              </div>
              <div className="step">
                <div className="s-num">2</div>
                <div className="s-txt"><strong>AI Analysis</strong><p>Analyze alignment with Target Job.</p></div>
              </div>
              <div className="step">
                <div className="s-num">3</div>
                <div className="s-txt"><strong>Improve & Apply</strong><p>Apply with confidence.</p></div>
              </div>
            </div>
            <div className="how-card-blue">
               <ul>
                 <li><FiCheckCircle className="check-blue" /> Resume structure analysis</li>
                 <li><FiCheckCircle className="check-blue" /> Personalized improvement tips</li>
                 <li><FiCheckCircle className="check-blue" /> ATS-friendly suggestions</li>
               </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default ScanCV;