import React, { useState } from "react";
import "./scanCV.css";

const ScanCV = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="scan-wrapper">

      {/* HEADER */}
      <div className="scan-header">
        <div className="badge">🔍 Scan Page CV</div>
        <h1>Scan Your CV</h1>
        <p>Upload your CV to improve your chances in job applications</p>
      </div>

      {/* CARD */}
      <div className="card">
        <h3 className="card-title">📄 CV Upload</h3>

        <div className="upload-container">

          {/* LEFT */}
          <div className="upload-box">
            <div className="box-header">
              📄 <span>Upload Document</span>
            </div>

            <label className="drop-area">
              <input type="file" hidden onChange={handleFileChange} />
              <div>
                <div className="cloud">☁️⬆️</div>
                <p>Drag & drop your CV here</p>
                <span>or <b>Browse File</b></span>
                {fileName && <p className="file-name">{fileName}</p>}
              </div>
            </label>

            <small>Supported: PDF, DOCX (Max 5MB)</small>
          </div>

          {/* OR */}
          <div className="or">OR</div>

          {/* RIGHT */}
          <div className="text-box">
            <div className="box-header">
              🅣 <span>Paste Text</span>
            </div>

            <textarea
              placeholder="Paste your CV content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <small>{text.length} characters</small>
          </div>

        </div>

        <button className="scan-btn">Scan Your CV Now</button>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="feature">
          🤖
          <div>
            <h4>AI-Powered Analysis</h4>
            <p>Smart insights to improve your CV</p>
          </div>
        </div>

        <div className="feature">
          🛡️
          <div>
            <h4>ATS-Friendly Tips</h4>
            <p>Optimize for applicant tracking systems</p>
          </div>
        </div>

        <div className="feature">
          🔒
          <div>
            <h4>Fast & Secure</h4>
            <p>Your data is never stored</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how">
        <h2>How It Works</h2>

        <div className="how-content">
          
          {/* LEFT STEPS */}
          <div className="steps">
            <div className="step">
              <span>1</span>
              <div>
                <h4>Upload or paste your CV</h4>
                <p>We support documents or plain text.</p>
              </div>
            </div>

            <div className="step">
              <span>2</span>
              <div>
                <h4>We analyze your CV</h4>
                <p>Get detailed insights and improvement areas.</p>
              </div>
            </div>

            <div className="step">
              <span>3</span>
              <div>
                <h4>Improve and stand out</h4>
                <p>Apply with confidence and get noticed.</p>
              </div>
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="tips-box">
            <ul>
              <li>✔ Resume structure analysis</li>
              <li>✔ Personalized improvement tips</li>
              <li>✔ ATS-friendly suggestions</li>
              <li>✔ Keyword recommendations</li>
              <li>✔ Fast results in seconds</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ScanCV;