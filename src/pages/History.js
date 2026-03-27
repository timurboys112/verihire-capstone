import React from 'react';
const History = () => {
    const [data, setData] = React.useState([
    { id: 1, name: 'PT.txt', type: 'Text', date: '1/1/2026', result: 'Fake' },
    { id: 2, name: 'PT.img', type: 'Image', date: '2/1/2026', result: 'Real' },
    { id: 3, name: 'PT.link', type: 'Link', date: '2/1/2026', result: 'Real' },
  ]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="history-page">
      <h2>Scan History</h2>
      <hr />
      <p>Scan Detail :</p>
      <table className="history-table">
        <thead>
          <tr>
            <th>Scan Number</th>
            <th>Scan Name</th>
            <th>Scan Type</th>
            <th>Date</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>
              <td className={item.result === 'Fake' ? 'fake-text' : 'real-text'}>{item.result}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;