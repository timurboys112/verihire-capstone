import React from 'react';

const Profile = ({ language }) => {
  const history = [
    { no: 1, nama: "PT.txt", tipe: "Text", status: "Masih Diproses" },
    { no: 2, nama: "PT.img", tipe: "Image", status: "Selesai" },
    { no: 3, nama: "PT.link", tipe: "Link", status: "Selesai" },
  ];

  return (
    <div className="profile-wrapper-final">
      <div className="container">
        {/* KARTU PROFIL UTAMA */}
        <section className="user-card-final">
          <div className="avatar-box-final">👤</div>
          <div className="user-info-final">
            <h1>Anindya Bulan</h1>
            <p className="email-text">anindya.bulan@example.com</p>
            <div className="stats-row-final">
              <span><strong>Bergabung:</strong> Januari 2026</span>
              <span className="dot-separator">•</span>
              <span><strong>Total Scan:</strong> 3</span>
            </div>
            <div className="action-buttons-final">
              <button className="btn-secondary-final">Edit Profil</button>
              <button className="btn-secondary-final">Ganti Password</button>
            </div>
          </div>
        </section>

        {/* TABEL RIWAYAT */}
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
                    <td><span className="type-badge-final">{item.tipe}</span></td>
                    <td>
                      <span className={`status-badge-final ${item.status === 'Selesai' ? 'done' : 'process'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td><button className="btn-delete-final">Hapus</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;