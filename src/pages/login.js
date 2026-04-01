import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import content from "../content";
import "./login.css";

function Login({ setUser, language }) { // ✅ pakai setUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const text = content[language].login;

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
      // ✅ SIMPAN USER LANGSUNG (bukan cuma email)
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ set ke state global
      setUser(user);

      navigate("/home");
    } else {
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

        <form>
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

          <button type="button" onClick={handleLogin}>
  {text.button}
</button>
        </form>

        <p>
          {text.noAccount} <Link to="/register">{text.register}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;