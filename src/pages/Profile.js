import "./profile.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, language }) => {
  const navigate = useNavigate();
  const isID = language === 'ID';

  // ================= TRANSLATIONS =================
  const content = {
    ID: {
      editBtn: "Edit Profil",
      passBtn: "Ganti Password",
      joined: "Bergabung:",
      totalScan: "Total Scan:",
      btnDelete: "HAPUS",
      btnDetails: "Details",
      btnSave: "Simpan",
      btnCancel: "Batal",
      labelUser: "Username",
      labelEmail: "Email",
      labelAvatar: "Pilih Avatar",
      labelOldPass: "Password Lama",
      labelNewPass: "Password Baru",
      labelConfirmPass: "Konfirmasi Password",
      alertSuccess: "Password berhasil diubah!",
      jobTitle: "Riwayat Scan Lowongan",
      cvTitle: "Riwayat Scan CV",
      colNo: "No. Scan",
      colContent: "Konten Scan",
      colType: "Tipe",
      colDate: "Tanggal",
      colResult: "Hasil",
      colAction: "Aksi",
      colCVName: "Nama File CV",
      colScore: "Skor CV",
      colMatch: "Status Kecocokan"
    },
    EN: {
      editBtn: "Edit Profile",
      passBtn: "Change Password",
      joined: "Joined:",
      totalScan: "Total Scan:",
      btnDelete: "DELETE",
      btnDetails: "Details",
      btnSave: "Save",
      btnCancel: "Cancel",
      labelUser: "Username",
      labelEmail: "Email",
      labelAvatar: "Choose Avatar",
      labelOldPass: "Old Password",
      labelNewPass: "New Password",
      labelConfirmPass: "Confirm Password",
      alertSuccess: "Password updated successfully!",
      jobTitle: "Scan Job History",
      cvTitle: "Scan CV History",
      colNo: "Scan Number",
      colContent: "Scan Content",
      colType: "Scan Type",
      colDate: "Date",
      colResult: "Result",
      colAction: "Action",
      colCVName: "CV File Name",
      colScore: "CV Score",
      colMatch: "CV Match Status"
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

  // ================= DATA DUMMY =================
  const jobHistory = [
    { no: 1, content: "PT.txt", type: "Text", date: "1/1/2026", result: isID ? "Risiko Tinggi" : "High Risk" },
    { no: 2, content: "PT.img", type: "Image", date: "2/1/2026", result: isID ? "Mencurigakan" : "Suspicious" },
    { no: 3, content: "PT.link", type: "Link", date: "2/1/2026", result: "Legit" },
  ];

  const cvHistory = [
    { no: 1, name: "CV_Izza_2026", date: "9/5/2026", score: 91, status: isID ? "Sangat Baik" : "Excellent" },
    { no: 2, name: "CV_Izza_2025", date: "9/5/2025", score: 70, status: isID ? "Tinggi" : "High" },
  ];

  const username = user?.username || "Anindya Chandra";
  const email = user?.email || "anindya.chandra@email.com";
  const joinDate = user?.createdAt || (isID ? "Baru saja" : "Just now");
  const avatarLetter = username.charAt(0).toUpperCase();

  // ================= HANDLERS =================
  const handleSave = () => {
    const updatedUser = { ...user, username: newUsername, email: newEmail, avatar: avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.reload();
  };

  return (
    <div className="profile-wrapper-final">
      <div className="container">
        
        {/* SECTION 1: PROFILE CARD */}
        {!isChangingPassword && (
          <section className="user-card-final">
            <div className="avatar-side-final">
              <div className="avatar-box-final">
                {avatar ? <img src={avatar} alt="avatar" className="avatar-img" /> : <span className="avatar-letter">{avatarLetter}</span>}
              </div>
              {isEditing && (
                <div className="avatar-picker-grid">
                  {avatarOptions.map((img, i) => (
                    <div key={i} className={`avatar-option bg${i + 1} ${avatar === img ? "active" : ""}`} onClick={() => setAvatar(img)}>
                      <img src={img} alt="option" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-form-side">
              {isEditing ? (
                <div className="edit-form-final">
                  <div className="form-group-final"><label>{t.labelUser}</label><input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} /></div>
                  <div className="form-group-final"><label>{t.labelEmail}</label><input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></div>
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
                    <span><strong>{t.totalScan}</strong> {jobHistory.length + cvHistory.length}</span>
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

        {/* SECTION 2: CHANGE PASSWORD */}
        {isChangingPassword && (
          <section className="user-card-final">
            <div className="profile-form-side" style={{ width: '100%' }}>
              <h2 className="figma-blue-title">{t.passBtn}</h2>
              <div className="edit-form-final" style={{ gridTemplateColumns: '1fr' }}>
                <div className="form-group-final"><label>{t.labelOldPass}</label><input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></div>
                <div className="form-group-final"><label>{t.labelNewPass}</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
                <div className="form-group-final"><label>{t.labelConfirmPass}</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                <div className="action-buttons-final">
                  <button onClick={() => {alert(t.alertSuccess); setIsChangingPassword(false)}} className="btn-primary-final">{t.btnSave}</button>
                  <button onClick={() => setIsChangingPassword(false)} className="btn-secondary-final">{t.btnCancel}</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: HISTORY - FIGMA SYNC */}
        {!isChangingPassword && (
          <div className="history-wrapper-figma">
            {/* JOB HISTORY */}
            <section className="history-card-final">
              <h2 className="figma-blue-title">{t.jobTitle}</h2>
              <div className="table-container-final">
                <table className="table-final figma-style">
                  <thead>
                    <tr>
                      <th>{t.colNo}</th>
                      <th>{t.colContent}</th>
                      <th>{t.colType}</th>
                      <th>{t.colDate}</th>
                      <th>{t.colResult}</th>
                      <th>{t.colAction}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobHistory.map((item, i) => (
                      <tr key={i}>
                        <td>{item.no}</td>
                        <td className="bold-text">{item.content}</td>
                        <td>{item.type}</td>
                        <td>{item.date}</td>
                        <td className={`res-col ${item.result.toLowerCase().includes('risk') || item.result.includes('Risiko') ? 'high-risk' : 'legit'}`}>{item.result}</td>
                        <td>
                          <div className="action-flex">
                            <button className="btn-details-blue" onClick={() => navigate('/scan')}>{t.btnDetails}</button>
                            <button className="btn-delete-figma">{t.btnDelete}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CV HISTORY */}
            <section className="history-card-final">
              <h2 className="figma-blue-title">{t.cvTitle}</h2>
              <div className="table-container-final">
                <table className="table-final figma-style">
                  <thead>
                    <tr>
                      <th>{t.colNo}</th>
                      <th>{t.colCVName}</th>
                      <th>{t.colDate}</th>
                      <th>{t.colScore}</th>
                      <th>{t.colMatch}</th>
                      <th>{t.colAction}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cvHistory.map((cv, i) => (
                      <tr key={i}>
                        <td>{cv.no}</td>
                        <td className="bold-text">{cv.name}</td>
                        <td>{cv.date}</td>
                        <td className="score-text">{cv.score}</td>
                        <td>{cv.status}</td>
                        <td>
                          <div className="action-flex">
                            <button className="btn-details-blue" onClick={() => navigate('/scan-cv')}>{t.btnDetails}</button>
                            <button className="btn-delete-figma">{t.btnDelete}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;