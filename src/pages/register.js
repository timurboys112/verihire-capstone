import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

// IMPORT ICON
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";

// IMPORT GAMBAR DARI ASSETS
import logoImg from "../assets/logo.png";
import illuImg from "../assets/illustration-login.png";

function Register({ language }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert(language === "ID" ? "Isi semua field!" : "Fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert(language === "ID" ? "Password tidak sama!" : "Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      alert(language === "ID" ? "Email sudah terdaftar!" : "Email already registered!");
      return;
    }

    const newUser = { id: Date.now(), username, email, password, avatar: "" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert(language === "ID" ? "Berhasil daftar!" : "Registration successful!");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">
            <img src={logoImg} alt="VeriHire" />
          </div>
          
          <h2>{language === "ID" ? "Daftar Akun" : "Create Account"}</h2>
          
          <form onSubmit={handleRegister}>
            <div className="auth-group">
              <label>Username</label>
              <div className="input-with-icon">
                <FiUser className="input-icon-v" />
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

            <div className="auth-group">
              <label>Email</label>
              <div className="input-with-icon">
                <FiMail className="input-icon-v" />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="auth-group">
              <label>Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon-v" />
                <input 
                  type={showPass ? "text" : "password"} 
                  placeholder="Password" 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="button" className="eye-icon-v" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="auth-group">
              <label>{language === "ID" ? "Konfirmasi Password" : "Confirm Password"}</label>
              <div className="input-with-icon">
                <FiLock className="input-icon-v" />
                <input 
                  type={showConfirm ? "text" : "password"} 
                  placeholder="Confirm Password" 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <button type="button" className="eye-icon-v" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-auth-primary">{language === "ID" ? "Daftar" : "Sign Up"}</button>
          </form>

          <p className="auth-footer">
            {language === "ID" ? "Sudah punya akun?" : "Already have an account?"} <Link to="/login">{language === "ID" ? "Masuk" : "Login"}</Link>
          </p>
        </div>

        <div className="auth-right">
          <img src={illuImg} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Register;