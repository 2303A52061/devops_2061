import React, { useState } from 'react';
import './App.css';

const students = [
  { id: 1, name: 'Alice Johnson', grade: 'A', score: 95, subject: 'Math' },
  { id: 2, name: 'Bob Smith',     grade: 'B', score: 82, subject: 'Science' },
  { id: 3, name: 'Carol White',   grade: 'A', score: 91, subject: 'English' },
  { id: 4, name: 'David Brown',   grade: 'C', score: 74, subject: 'History' },
  { id: 5, name: 'Eva Green',     grade: 'A', score: 98, subject: 'Math' },
];

function App() {
  const [search, setSearch] = useState('');
  const [version] = useState('v1.0-frontend');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const avg = Math.round(students.reduce((a, s) => a + s.score, 0) / students.length);

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 Student Dashboard</h1>
        <span className="badge">{version}</span>
      </header>

      <div className="stats">
        <div className="stat-card"><h3>Total Students</h3><p>{students.length}</p></div>
        <div className="stat-card"><h3>Average Score</h3><p>{avg}%</p></div>
        <div className="stat-card"><h3>Top Score</h3><p>{Math.max(...students.map(s => s.score))}%</p></div>
        <div className="stat-card"><h3>Deployed On</h3><p>PaaS Cloud</p></div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search student..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr><th>#</th><th>Name</th><th>Subject</th><th>Score</th><th>Grade</th></tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.subject}</td>
              <td>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${s.score}%` }} />
                  <span>{s.score}%</span>
                </div>
              </td>
              <td><span className={`grade grade-${s.grade}`}>{s.grade}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="footer">
        <p>🚀 Deployed via CI/CD · Containerized with Docker · {new Date().toDateString()}</p>
      </footer>
    </div>
  );
}

export default App;
