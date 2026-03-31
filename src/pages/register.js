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

    // validasi kosong
    if (!username || !email || !password || !confirmPassword) {
      alert("Isi semua field!");
      return;
    }

    // validasi password sama
    if (password !== confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    // ambil data user lama
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // cek email sudah ada
    const isExist = users.find((user) => user.email === email);

    if (isExist) {
      alert("Email sudah terdaftar!");
      return;
    }

    // tambah user baru
    const newUser = { username, email, password };
    users.push(newUser);

    // simpan ke localStorage
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
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
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