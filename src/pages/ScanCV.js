import React, { useState } from 'react';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiCpu, FiShield, FiSearch } from 'react-icons/fi';
import './scanCV.css';


function ScanCV({ language }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
const [showModal, setShowModal] = useState(false);
  const isID = language === 'ID';

  // Objek Teks Bilingual
  const t = {
    badge: isID ? "Halaman Scan CV" : "Scan Page CV",
    subtitle: isID ? "Unggah CV Anda untuk meningkatkan peluang dalam lamaran kerja" : "Upload your CV to improve your chances in job applications",
    cardLabel: isID ? "Unggah CV" : "CV Upload",
    tabUpload: isID ? "Unggah Dokumen" : "Upload Document",
    tabPaste: isID ? "Tempel Teks" : "Paste Text",
    tabPasteSub: isID ? "Ketik atau tempel konten CV" : "Type or paste your CV content",
    dropzone: isID ? "Tarik & lepas CV Anda di sini" : "Drag & drop your CV here",
    browse: isID ? "Pilih File" : "Browse File",
    btnScan: isID ? "Scan CV Anda Sekarang" : "Scan Your CV Now",
    howItWorks: isID ? "Cara Kerja" : "How It Works",
    step1Title: isID ? "Unggah atau tempel CV" : "Upload or paste your CV",
    step1Desc: isID ? "Kami mendukung dokumen atau teks biasa." : "We support documents or your plain text.",
    step2Title: isID ? "Kami menganalisis CV Anda" : "We analyze your CV",
    step2Desc: isID ? "Dapatkan wawasan detail dan area perbaikan." : "Get detailed insights and improvement areas.",
    step3Title: isID ? "Tampil menonjol & perbaiki" : "Improve and stand out",
    step3Desc: isID ? "Lamar dengan percaya diri dan tarik perhatian." : "Apply with confidence and get noticed."
  };

  return (
    <div className="scan-cv-container">
      <div className="container">

        {showModal && (
  <div className="modal-overlay">
    <div className="modal-card">

      {/* HEADER */}
      <div className="modal-header">
        <h2>CV Scan Results</h2>
        <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
      </div>

      {/* TOP SECTION */}
      <div className="modal-top">
        <div className="score-section">
          <div className="score-circle">50</div>
          <p>
            CV Score <span className="badge">Medium</span>
          </p>
        </div>

        <div className="user-info">
          <h3>John Doe</h3>
          <p>ID: #ID202456</p>
          <p>Target Job: Senior Software Engineer</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="modal-grid">

        <div className="card">
          <h4>Medium Match</h4>
          <p>
            Your CV meets most of the key requirements of the target job and can be improved further.
          </p>
        </div>

        <div className="card">
          <h4>Strengths</h4>
          <ul>
            <li>Over 5 years of experience in software development</li>
            <li>Proficient in Python and JavaScript</li>
            <li>Demonstrated leadership and mentoring</li>
          </ul>
        </div>

        <div className="card">
          <h4>Improvement Advice</h4>
          <p>
            Your CV meets most requirements but still needs improvement to better match the job.
          </p>
        </div>

        <div className="card">
          <h4>Weaknesses</h4>
          <ul>
            <li>No mention of cloud platforms (AWS/Azure)</li>
            <li>Lack of measurable achievements</li>
            <li>No Scrum/Kanban keywords</li>
          </ul>
        </div>

        <div className="card full">
          <h4>Rephrase Suggestions</h4>
          <ul>
            <li>Add ATS-friendly keywords</li>
            <li>Use strong action verbs</li>
            <li>Improve formatting for readability</li>
          </ul>
        </div>

        <div className="card full">
          <h4>Job Recommendations</h4>
          <ul>
            <li>Lead Software Engineer</li>
            <li>Solutions Architect</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
)}
        
        <div className="cv-header-section">
          <div className="badge-scan">
            <FiSearch className="mr-5" /> {t.badge}
          </div>
          <h1 className="main-title">Scan Your CV</h1>
          <p className="main-subtitle">{t.subtitle}</p>
        </div>

        <div className="cv-main-card">
          <div className="card-top-header">
            <FiFileText className="icon-blue" /> {t.cardLabel}
          </div>

          <div className="card-content-grid">
            <div className="content-side">
              <div className="tab-indicator active">
                <FiFileText className="mr-10" /> 
                <div>
                    <strong>{t.tabUpload}</strong><br/>
                    <small>PDF, DOCX (Max 5MB)</small>
                </div>
              </div>
              
              <div className="dropzone-box">
                <input type="file" id="cv-file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                <label htmlFor="cv-file" className="dropzone-label">
                  <FiUploadCloud className="upload-icon-big" />
                  <p>{t.dropzone} or <span>{t.browse}</span></p>
                  <small className="file-info">
                    {selectedFile ? `Selected: ${selectedFile.name}` : "Supported: .PDF, .DOCX (Max 5MB)"}
                  </small>
                </label>
              </div>
            </div>

            <div className="or-divider">
              <div className="line"></div>
              <div className="or-circle">OR</div>
              <div className="line"></div>
            </div>

            <div className="content-side">
              <div className="tab-indicator gray">
                <FiFileText className="mr-10" />
                <div>
                    <strong>{t.tabPaste}</strong><br/>
                    <small>{t.tabPasteSub}</small>
                </div>
              </div>

              <div className="paste-box">
                <textarea 
                  placeholder={isID ? "Tempel konten CV Anda di sini..." : "Paste your CV content here..."}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                ></textarea>
                <div className="char-count">{pastedText.length} characters</div>
              </div>
            </div>
          </div>

          <button 
  className="btn-scan-primary" 
  onClick={() => setShowModal(true)}
>
  {t.btnScan}
</button>
        </div>

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

  
  
</div>

        <div className="how-it-works-section">
            <h2 className="section-title-how">
                <FiCheckCircle className="icon-blue-big" /> {t.howItWorks}
            </h2>
            <div className="how-grid">
                <div className="how-steps-list">
                    <div className="step-item">
                        <div className="step-num">1</div>
                        <div className="step-txt">
                            <strong>{t.step1Title}</strong>
                            <p>{t.step1Desc}</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-num">2</div>
                        <div className="step-txt">
                            <strong>{t.step2Title}</strong>
                            <p>{t.step2Desc}</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-num">3</div>
                        <div className="step-txt">
                            <strong>{t.step3Title}</strong>
                            <p>{t.step3Desc}</p>
                        </div>
                    </div>
                </div>

                <div className="how-benefits-card">
                    <ul className="benefit-list">
                        <li><FiCheckCircle className="check-blue" /> {isID ? "Analisis struktur resume" : "Resume structure analysis"}</li>
                        <li><FiCheckCircle className="check-blue" /> {isID ? "Tips perbaikan personal" : "Personalized improvement tips"}</li>
                        <li><FiCheckCircle className="check-blue" /> {isID ? "Saran ramah ATS" : "ATS-friendly suggestions"}</li>
                        <li><FiCheckCircle className="check-blue" /> {isID ? "Rekomendasi kata kunci" : "Keyword recommendations"}</li>
                        <li><FiCheckCircle className="check-blue" /> {isID ? "Hasil cepat dalam hitungan detik" : "Fast results in seconds"}</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ScanCV;