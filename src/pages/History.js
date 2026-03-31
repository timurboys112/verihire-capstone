import React from 'react';

const History = ({ language }) => {

  const [data, setData] = React.useState([
    { id: 1, name: 'PT.txt', type: 'Text', date: '1/1/2026', result: 'Fake' },
    { id: 2, name: 'PT.img', type: 'Image', date: '2/1/2026', result: 'Real' },
    { id: 3, name: 'PT.link', type: 'Link', date: '2/1/2026', result: 'Real' },
  ]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  // KAMUS
  const content = {
    ID: {
      title: "Riwayat Scan",
      detail: "Detail Scan:",
      table: ["No", "Nama Scan", "Tipe", "Tanggal", "Hasil", "Aksi"],
      delete: "Hapus",
      fake: "Palsu",
      real: "Aman"
    },
    EN: {
      title: "Scan History",
      detail: "Scan Detail:",
      table: ["No", "Scan Name", "Type", "Date", "Result", "Action"],
      delete: "Delete",
      fake: "Fake",
      real: "Real"
    }
  };

  const t = content[language || 'ID'];

  return (
    <div className="history-page">
      <h2>{t.title}</h2>
      <hr />
      <p>{t.detail}</p>

      <table className="history-table">
        <thead>
          <tr>
            {t.table.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>

              {/* RESULT */}
              <td className={item.result === 'Fake' ? 'fake-text' : 'real-text'}>
                {item.result === 'Fake' ? t.fake : t.real}
              </td>

              <td>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(item.id)}
                >
                  {t.delete}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;