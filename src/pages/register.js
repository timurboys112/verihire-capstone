import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Isi semua field!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = users.find((user) => user.email === email);

    if (isExist) {
      alert("Email sudah terdaftar!");
      return;
    }

    // ✅ Tambah ID unik
    const newUser = {
      id: Date.now(), // simple unique id
      username,
      email,
      password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Berhasil daftar!");

    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Daftar</h2>

        <form onSubmit={handleRegister}>
          <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<input
  type="password"
  placeholder="Konfirmasi Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

          <button type="submit">Daftar</button>
        </form>

        <p>
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;