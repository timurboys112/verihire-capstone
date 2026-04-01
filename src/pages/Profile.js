import "./profile.css";
import React, { useState } from "react";

const Profile = ({ user }) => {
  // ================= AVATAR OPTIONS =================
  const avatarOptions = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Nala",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Zara",
];

  // ================= STATE =================
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ================= DATA =================
  const history = [
    { no: 1, nama: "PT.txt", tipe: "Text", status: "Masih Diproses" },
    { no: 2, nama: "PT.img", tipe: "Image", status: "Selesai" },
    { no: 3, nama: "PT.link", tipe: "Link", status: "Selesai" },
  ];

  const username = user?.username || "No Name";
  const email = user?.email || "-";
  const joinDate = user?.createdAt || "Baru saja";
  const avatarLetter = username.charAt(0).toUpperCase();

  // ================= HANDLE EDIT PROFILE =================
  const handleSave = () => {
    const updatedUser = {
      ...user,
      username: newUsername,
      email: newEmail,
      avatar: avatar,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    window.location.reload();
  };

  // ================= HANDLE CHANGE PASSWORD =================
  const handleChangePassword = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (oldPassword !== currentUser.password) {
      alert("Password lama salah!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    const updatedUser = {
      ...currentUser,
      password: newPassword,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password berhasil diubah!");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  // ================= UI =================
  return (
    <div className="profile-wrapper-final">
      <div className="container">

        {/* ================= PROFILE ================= */}
        {!isChangingPassword && (
          <section className="user-card-final">

            <div className="avatar-box-final">
              {avatar ? (
                <img src={avatar} alt="avatar" className="avatar-img" />
              ) : (
                avatarLetter
              )}
            </div>

            <div className="user-info-final">

              {isEditing ? (
                <div className="edit-form-final">

                  <div className="form-group-final">
                    <label>Username</label>
                    <input
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group-final">
                    <label>Email</label>
                    <input
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>

                  {/* ✅ AVATAR PICKER */}
                  <div className="form-group-final">
                    <label>Pilih Avatar</label>

                    <div className="avatar-list">
                      {avatarOptions.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="avatar"
                          className={`avatar-option ${
                            avatar === img ? "selected" : ""
                          }`}
                          onClick={() => setAvatar(img)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="edit-actions-final">
                    <button onClick={handleSave} className="btn-save-final">
                      Simpan
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-cancel-final"
                    >
                      Batal
                    </button>
                  </div>

                </div>
              ) : (
                <>
                  <h1>{username}</h1>
                  <p className="email-text">{email}</p>

                  <div className="action-buttons-final">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary-final"
                    >
                      Edit Profil
                    </button>

                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="btn-secondary-final"
                    >
                      Ganti Password
                    </button>
                  </div>
                </>
              )}

              <div className="stats-row-final">
                <span>
                  <strong>Bergabung:</strong> {joinDate}
                </span>

                <span className="dot-separator">•</span>

                <span>
                  <strong>Total Scan:</strong> {history.length}
                </span>
              </div>

            </div>
          </section>
        )}

        {/* ================= CHANGE PASSWORD ================= */}
        {isChangingPassword && (
          <section className="user-card-final">

            <div className="user-info-final">
              <h2>Ganti Password</h2>

              <div className="edit-form-final">

                <div className="form-group-final">
                  <label>Password Lama</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="form-group-final">
                  <label>Password Baru</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group-final">
                  <label>Konfirmasi Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="edit-actions-final">
                  <button
                    onClick={handleChangePassword}
                    className="btn-save-final"
                  >
                    Simpan
                  </button>

                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="btn-cancel-final"
                  >
                    Batal
                  </button>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ================= HISTORY ================= */}
        {!isChangingPassword && (
          <section className="history-card-final">

            <div className="history-header-final">
              <h2>Riwayat Pencarian</h2>
              <p>Kelola data hasil deteksi AI kamu di sini.</p>
            </div>

            <div className="table-container-final">
              <table className="table-final">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Scan</th>
                    <th>Tipe</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item, i) => (
                    <tr key={i}>
                      <td>{item.no}</td>
                      <td className="bold-text">{item.nama}</td>

                      <td>
                        <span className="type-badge-final">
                          {item.tipe}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge-final ${
                            item.status === "Selesai"
                              ? "done"
                              : "process"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <button className="btn-delete-final">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </section>
        )}

      </div>
    </div>
  );
};

export default Profile;