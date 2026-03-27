import React from 'react';

const Profile = () => {
  const user = {
    name: "Anindya Bulan",
    email: "anindya.bulan@example.com",
    memberSince: "Januari 2026",
    totalScans: 12
  };

  const scanReports = [
    { id: 1, name: 'PT.txt', type: 'Text' },
    { id: 2, name: 'PT.img', type: 'Image' },
    { id: 3, name: 'PT.link', type: 'Link' },
  ];

  return (
    <div className="container profile-page">
      <h2>My Profile</h2>
      <hr />
      
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-avatar">👤</div>
          <div className="profile-details">
            <h3>{user.name}</h3>
            <p className="email">{user.email}</p>
            <p><strong>Member Since:</strong> {user.memberSince}</p>
            <p><strong>Total Scans:</strong> {user.totalScans}</p>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn-edit">Edit Profile</button>
          <button className="btn-password">Change Password</button>
        </div>
      </div>

      {/* Bagian Status Report Terbaru */}
      <div className="reports-wrapper">
        <div className="report-box">
          <div className="report-header">
            <span>Status : Still Reporting</span>
            <span className="refresh-icon">🔄</span>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>Scan Number</th>
                <th>Scan Name</th>
                <th>Scan Type</th>
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

        <div className="report-box">
          <div className="report-header">
            <span>Status : Done Report</span>
            <span className="refresh-icon">🔄</span>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>Scan Number</th>
                <th>Scan Name</th>
                <th>Scan Type</th>
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