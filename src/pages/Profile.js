import "./profile.css";
import React, { useState } from "react";

const Profile = ({ user, language }) => {
  // ================= TRANSLATIONS =================
  const content = {
    ID: {
      editBtn: "Edit Profil",
      passBtn: "Ganti Password",
      joined: "Bergabung:",
      totalScan: "Total Scan:",
      historyTitle: "Riwayat Pencarian",
      historyDesc: "Kelola data hasil deteksi AI kamu di sini.",
      tableNo: "No",
      tableName: "Nama Scan",
      tableType: "Tipe",
      tableStatus: "Status",
      tableAction: "Aksi",
      btnDelete: "Hapus",
      btnSave: "Simpan",
      btnCancel: "Batal",
      labelUser: "Username",
      labelEmail: "Email",
      labelAvatar: "Pilih Avatar",
      labelOldPass: "Password Lama",
      labelNewPass: "Password Baru",
      labelConfirmPass: "Konfirmasi Password",
      alertOldWrong: "Password lama salah!",
      alertNoMatch: "Konfirmasi password tidak cocok!",
      alertMinChar: "Password minimal 6 karakter!",
      alertSuccess: "Password berhasil diubah!"
    },
    EN: {
      editBtn: "Edit Profile",
      passBtn: "Change Password",
      joined: "Joined:",
      totalScan: "Total Scan:",
      historyTitle: "Search History",
      historyDesc: "Manage your AI detection results here.",
      tableNo: "No",
      tableName: "Scan Name",
      tableType: "Type",
      tableStatus: "Status",
      tableAction: "Action",
      btnDelete: "Delete",
      btnSave: "Save",
      btnCancel: "Cancel",
      labelUser: "Username",
      labelEmail: "Email",
      labelAvatar: "Choose Avatar",
      labelOldPass: "Old Password",
      labelNewPass: "New Password",
      labelConfirmPass: "Confirm Password",
      alertOldWrong: "Old password is incorrect!",
      alertNoMatch: "Passwords do not match!",
      alertMinChar: "Password must be at least 6 characters!",
      alertSuccess: "Password updated successfully!"
    }
  };

  const t = content[language || 'ID'];

  const avatarOptions = [
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
    "https://cdn-icons-png.flaticon.com/512/4128/4128176.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
    "https://cdn-icons-png.flaticon.com/512/4128/4128335.png"
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
    { no: 1, nama: "PT.txt", tipe: "Text", status: language === "EN" ? "In Progress" : "Masih Diproses" },
    { no: 2, nama: "PT.img", tipe: "Image", status: language === "EN" ? "Completed" : "Selesai" },
    { no: 3, nama: "PT.link", tipe: "Link", status: language === "EN" ? "Completed" : "Selesai" },
  ];

  const username = user?.username || "No Name";
  const email = user?.email || "-";
  const joinDate = user?.createdAt || (language === "EN" ? "Just now" : "Baru saja");
  const avatarLetter = username.charAt(0).toUpperCase();

  // ================= HANDLERS =================
  const handleSave = () => {
    const updatedUser = { ...user, username: newUsername, email: newEmail, avatar: avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => u.id === user.id ? updatedUser : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload();
  };

  const handleChangePassword = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (oldPassword !== currentUser.password) { alert(t.alertOldWrong); return; }
    if (newPassword !== confirmPassword) { alert(t.alertNoMatch); return; }
    if (newPassword.length < 6) { alert(t.alertMinChar); return; }

    const updatedUser = { ...currentUser, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => u.id === currentUser.id ? updatedUser : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert(t.alertSuccess);
    setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    setIsChangingPassword(false);
  };

  return (
    <div className="profile-wrapper-final">
      <div className="container">
        
        {/* SECTION: PROFILE CARD */}
        {!isChangingPassword && (
          <section className="user-card-final">
            
            {/* KIRI: AVATAR SIDE */}
            <div className="avatar-side-final">
              <div className="avatar-box-final">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="avatar-img" />
                ) : (
                  <span className="avatar-letter">{avatarLetter}</span>
                )}
              </div>
              
              {isEditing && (
                <>
                  <p className="label-small">{t.labelAvatar}</p>
                  <div className="avatar-picker-grid">
                    {avatarOptions.map((img, i) => (
                      <div 
                        key={i} 
                        className={`avatar-option bg${i + 1} ${avatar === img ? "active" : ""}`}
                        onClick={() => setAvatar(img)}
                      >
                        <img src={img} alt="option" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* KANAN: INFO / EDIT SIDE */}
            <div className="profile-form-side">
              {isEditing ? (
                <div className="edit-form-final">
                  <div className="form-group-final">
                    <label>{t.labelUser}</label>
                    <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                  </div>
                  <div className="form-group-final">
                    <label>{t.labelEmail}</label>
                    <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                  </div>
                  <div className="action-buttons-final">
                    <button onClick={handleSave} className="btn-primary-final">{t.btnSave}</button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary-final">{t.btnCancel}</button>
                  </div>
                </div>
              ) : (
                <div className="user-info-display">
                  <h1>{username}</h1>
                  <p className="joined-text">{email}</p>
                  <div className="stats-row-final">
                    <span><strong>{t.joined}</strong> {joinDate}</span>
                    <span className="dot-separator">•</span>
                    <span><strong>{t.totalScan}</strong> {history.length}</span>
                  </div>
                  <div className="action-buttons-final">
                    <button onClick={() => setIsEditing(true)} className="btn-primary-final">{t.editBtn}</button>
                    <button onClick={() => setIsChangingPassword(true)} className="btn-secondary-final">{t.passBtn}</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION: CHANGE PASSWORD */}
        {isChangingPassword && (
          <section className="user-card-final">
            <div className="profile-form-side" style={{ width: '100%' }}>
              <h2>{t.passBtn}</h2>
              <div className="edit-form-final" style={{ gridTemplateColumns: '1fr' }}>
                <div className="form-group-final">
                  <label>{t.labelOldPass}</label>
                  <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="form-group-final">
                  <label>{t.labelNewPass}</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group-final">
                  <label>{t.labelConfirmPass}</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="action-buttons-final">
                  <button onClick={handleChangePassword} className="btn-primary-final">{t.btnSave}</button>
                  <button onClick={() => setIsChangingPassword(false)} className="btn-secondary-final">{t.btnCancel}</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION: HISTORY */}
        {!isChangingPassword && (
          <section className="history-card-final">
            <div className="history-header-final">
              <h2>{t.historyTitle}</h2>
              <p>{t.historyDesc}</p>
            </div>
            <div className="table-container-final">
              <table className="table-final">
                <thead>
                  <tr>
                    <th>{t.tableNo}</th>
                    <th>{t.tableName}</th>
                    <th>{t.tableType}</th>
                    <th>{t.tableStatus}</th>
                    <th>{t.tableAction}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, i) => (
                    <tr key={i}>
                      <td>{item.no}</td>
                      <td className="bold-text">{item.nama}</td>
                      <td><span className="status-badge-final process" style={{ background: '#E0F2F1', color: '#00796B'}}>{item.tipe}</span></td>
                      <td>
                        <span className={`status-badge-final ${item.status === "Selesai" || item.status === "Completed" ? "done" : "process"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td><button className="btn-delete-final">{t.btnDelete}</button></td>
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