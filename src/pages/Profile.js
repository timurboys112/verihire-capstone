import React from 'react';

const Profile = ({ language }) => {

  const user = {
    name: "Anindya Bulan",
    email: "anindya.bulan@example.com",
    memberSince: {
      ID: "Januari 2026",
      EN: "January 2026"
    },
    totalScans: 12
  };

  const scanReports = [
    { id: 1, name: 'PT.txt', type: 'Text' },
    { id: 2, name: 'PT.img', type: 'Image' },
    { id: 3, name: 'PT.link', type: 'Link' },
  ];

  // KAMUS
  const content = {
    ID: {
      title: "Profil Saya",
      memberSince: "Bergabung Sejak:",
      totalScans: "Total Scan:",
      edit: "Edit Profil",
      password: "Ganti Password",
      statusProcess: "Status : Masih Diproses",
      statusDone: "Status : Selesai",
      table: ["No Scan", "Nama Scan", "Tipe Scan"]
    },
    EN: {
      title: "My Profile",
      memberSince: "Member Since:",
      totalScans: "Total Scans:",
      edit: "Edit Profile",
      password: "Change Password",
      statusProcess: "Status : Still Reporting",
      statusDone: "Status : Done Report",
      table: ["Scan Number", "Scan Name", "Scan Type"]
    }
  };

  const t = content[language || 'ID'];

  return (
    <div className="container profile-page">
      <h2>{t.title}</h2>
      <hr />
      
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-avatar">👤</div>
          <div className="profile-details">
            <h3>{user.name}</h3>
            <p className="email">{user.email}</p>
            <p><strong>{t.memberSince}</strong> {user.memberSince[language || 'ID']}</p>
            <p><strong>{t.totalScans}</strong> {user.totalScans}</p>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn-edit">{t.edit}</button>
          <button className="btn-password">{t.password}</button>
        </div>
      </div>

      {/* REPORT */}
      <div className="reports-wrapper">
        
        {/* PROCESS */}
        <div className="report-box">
          <div className="report-header">
            <span>{t.statusProcess}</span>
            <span className="refresh-icon">🔄</span>
          </div>

          <table className="report-table">
            <thead>
              <tr>
                <th>{t.table[0]}</th>
                <th>{t.table[1]}</th>
                <th>{t.table[2]}</th>
              </tr>
            </thead>

            <tbody>
              {scanReports.map((scan) => (
                <tr key={scan.id}>
                  <td>{scan.id}</td>
                  <td>{scan.name}</td>
                  <td>{scan.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DONE */}
        <div className="report-box">
          <div className="report-header">
            <span>{t.statusDone}</span>
            <span className="refresh-icon">🔄</span>
          </div>

          <table className="report-table">
            <thead>
              <tr>
                <th>{t.table[0]}</th>
                <th>{t.table[1]}</th>
                <th>{t.table[2]}</th>
              </tr>
            </thead>

            <tbody>
              {scanReports.map((scan) => (
                <tr key={scan.id}>
                  <td>{scan.id}</td>
                  <td>{scan.name}</td>
                  <td>{scan.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Profile;