import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import content from "../content";
import "./login.css"; 

// IMPORT ICON PROFESIONAL
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

// IMPORT GAMBAR DARI ASSETS
import logoImg from "../assets/logo.png";
import illuImg from "../assets/illustration-login.png";

function Login({ setUser, language }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const text = content[language].login;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert(language === "ID" ? "Isi semua field!" : "Fill all fields!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      setUser(user);
      navigate("/home");
    } else {
      alert(language === "ID" ? "Email atau password salah!" : "Invalid email or password!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">
            <img src={logoImg} alt="VeriHire" />
          </div>
          
          <h2>{text.title}</h2>
          
          <form onSubmit={handleLogin}>
            <div className="auth-group">
              <label>Email</label>
              <div className="input-with-icon">
                <FiMail className="input-icon-v" />
                <input 
                  type="email" 
                  placeholder={text.email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="auth-group">
              <div className="label-row">
                <label>{language === "ID" ? "Kata Sandi" : "Password"}</label>
                {/* FIX: Pakai Link asli ke halaman forgot-password */}
                <Link to="/forgot-password" style={{ color: "#4f46e5", textDecoration: "none", fontSize: "0.8rem", fontWeight: "600" }}>
                  {language === "ID" ? "Lupa Password?" : "Forgot Password?"}
                </Link>
              </div>
              <div className="input-with-icon">
                <FiLock className="input-icon-v" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder={text.password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="eye-icon-v" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-auth-primary">{text.button}</button>
          </form>

          <p className="auth-footer">
            {text.noAccount} <Link to="/register">{text.register}</Link>
          </p>
        </div>

        <div className="auth-right">
          <img src={illuImg} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;