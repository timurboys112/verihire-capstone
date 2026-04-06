import React, { useState } from 'react';
import { FiUploadCloud, FiFileText, FiLink, FiShield, FiCpu, FiCheckCircle, FiSearch } from 'react-icons/fi';
import './Scan.css';

const Scan = ({ language }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const isID = language === 'ID';

  // Objek Teks Bilingual
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
    feat1: isID ? "Analisis Berbasis AI" : "AI-Powered Analysis",
    feat2: isID ? "Tips Ramah ATS" : "ATS-Friendly Tips",
    feat3: isID ? "Cepat & Aman" : "Fast & Secure",
    exTitle: isID ? "Coba Contoh Ini" : "Try These Examples",
    exHigh: isID ? "Risiko Tinggi" : "High Risk",
    exSafe: isID ? "Aman" : "Safe",
    btnUse: isID ? "Gunakan Contoh" : "Use This Example",
    analyzeTitle: isID ? "Apa yang Kami Analisis" : "What We Analyze"
  };

  const handleUseExample = (text) => setInput(text);

  return (
    <div className="scan-page-wrapper">
      <div className="container-figma">
        
        <header className="scan-hero">
          <div className="scan-badge">
            <FiSearch className="mr-5" /> {t.badge}
          </div>
          <h1 className="figma-title">{t.title}</h1>
          <p className="figma-subtitle">{t.subtitle}</p>
        </header>

        <div className="main-white-card">
          <div className="card-label-top">
             <FiFileText className="blue-icon" /> {t.cardLabel}
          </div>

          <div className="split-layout">
            <div className="input-column">
               <div className="tab-header-figma active">
                  <div className="tab-icon-box"><FiFileText /></div>
                  <div className="tab-text">
                    <strong>{t.tabUploadTitle}</strong>
                    <small>PDF, DOCX, JPG, PNG (Max 5MB)</small>
                  </div>
               </div>

               <div className="figma-dropzone">
                  <input type="file" id="job-upload" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                  <label htmlFor="job-upload">
                    <FiUploadCloud className="cloud-svg" />
                    <p>{t.dropzoneTxt} <br /> or <span>{t.browse}</span></p>
                    <small className="muted-text">{t.supported}</small>
                    {selectedFile && <div className="selected-tag">{selectedFile.name}</div>}
                  </label>
               </div>
            </div>

            <div className="divider-v">
               <div className="or-bubble">OR</div>
            </div>

            <div className="input-column">
               <div className="tab-header-figma muted">
                  <div className="tab-icon-box gray"><FiLink /></div>
                  <div className="tab-text">
                    <strong>{t.tabPasteTitle} <span className="light-text">Or URL</span></strong>
                    <small>{t.tabPasteSub}</small>
                  </div>
               </div>

               <div className="textarea-container">
                  <textarea 
                    placeholder={t.placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                  <div className="char-count-figma">{input.length} characters</div>
               </div>
            </div>
          </div>

          <button className="btn-scan-figma">
            <FiCpu className="mr-10" /> {t.btnScan}
          </button>
        </div>

        <div className="features-row-figma">
           <div className="feat-card"><FiCpu className="blue-icon" /> {t.feat1}</div>
           <div className="feat-card"><FiShield className="blue-icon" /> {t.feat2}</div>
           <div className="feat-card"><FiCheckCircle className="blue-icon" /> {t.feat3}</div>
        </div>

        <section className="try-examples">
           <h3 className="section-title-figma">{t.exTitle}</h3>
           <div className="examples-grid-figma">
              <div className="ex-card-figma">
                 <div className="ex-head">{isID ? "Contoh Risiko Tinggi" : "High Risk Example"} <span className="badge-red">{t.exHigh}</span></div>
                 <p>{isID ? "DARURAT!! Hasilkan $5000/minggu kerja dari rumah! Tanpa pengalaman. Kirim biaya pendaftaran $50..." : "URGENT!! Earn $5000/week working from home! No experience needed. Just send $50 registration fee..."}</p>
                 <button className="btn-use-ex" onClick={() => handleUseExample("URGENT!! Earn $5000/week...")}>{t.btnUse}</button>
              </div>
              <div className="ex-card-figma">
                 <div className="ex-head">{isID ? "Contoh Aman" : "Safe Example"} <span className="badge-green">{t.exSafe}</span></div>
                 <p>{isID ? "Senior Software Engineer di TechCorp. Tanggung Jawab: Mengembangkan aplikasi web skala besar..." : "Senior Software Engineer at TechCorp. Responsibilities: Develop scalable web applications..."}</p>
                 <button className="btn-use-ex" onClick={() => handleUseExample("Senior Software Engineer at TechCorp...")}>{t.btnUse}</button>
              </div>
           </div>
        </section>

        <div className="analyze-blue-card">
           <h4><FiCpu className="blue-icon" /> {t.analyzeTitle}</h4>
           <div className="analyze-grid-figma">
              <ul>
                 <li>• {isID ? "Janji gaji tidak realistis" : "Unrealistic salary promises"}</li>
                 <li>• {isID ? "Metode kontak mencurigakan" : "Suspicious contact methods"}</li>
                 <li>• {isID ? "Bahasa mendesak dan taktik tekanan" : "Urgent language and pressure tactics"}</li>
              </ul>
              <ul>
                 <li>• {isID ? "Permintaan pembayaran atau biaya" : "Payment or fee requests"}</li>
                 <li>• {isID ? "Deskripsi pekerjaan tidak jelas" : "Vague job descriptions"}</li>
                 <li>• {isID ? "Informasi perusahaan hilang" : "Missing company information"}</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;