import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import content from "../content"; //  IMPORT KAMUS
import "./login.css";

function Login({ setIsLoggedIn, language }) { //  TAMBAH language
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const text = content[language].login; //  AMBIL TEKS SESUAI BAHASA

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(language === "ID" ? "Isi semua field!" : "Fill all fields!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", email);

      setIsLoggedIn(true);
      navigate("/home");
    } else {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);

      alert(
        language === "ID"
          ? "Email atau password salah!"
          : "Invalid email or password!"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{text.title}</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={text.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder={text.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{text.button}</button>
        </form>

        <p>
          {text.noAccount} <Link to="/register">{text.register}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;