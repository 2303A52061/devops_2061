import React, { useState } from 'react'
import StudentCard from './StudentCard'

export default function App() {
  // Store student details in parent (App) and allow dynamic additions
  const [students, setStudents] = useState([
    { name: 'Alice', roll: 'A01', marks: { Math: 95, Science: 90, English: 85 } },
    { name: 'Bob', roll: 'B02', marks: { Math: 70, Science: 65, English: 75 } },
    { name: 'Charlie', roll: 'C03', marks: { Math: 60, Science: 70, English: 65 } },
  ])

  const [form, setForm] = useState({ name: '', roll: '', math: '', science: '', english: '' })
  const [dark, setDark] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleAdd(e) {
    e.preventDefault()
    const newStudent = {
      name: form.name || 'Unnamed',
      roll: form.roll || `R${Date.now() % 10000}`,
      marks: {
        Math: Number(form.math) || 0,
        Science: Number(form.science) || 0,
        English: Number(form.english) || 0,
      },
    }
    setStudents((s) => [newStudent, ...s])
    setForm({ name: '', roll: '', math: '', science: '', english: '' })
  }

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <header className="app-header">
        <div>
          <h1>Student Marks Card</h1>
          <p className="muted">Parent (App) stores students and passes data to StudentCard via props.</p>
        </div>

        <div className="header-actions">
          <button className="btn ghost" onClick={() => setDark((d) => !d)}>
            {dark ? 'Light' : 'Dark'} Theme
          </button>
        </div>
      </header>

      <section className="controls">
        <form className="add-form" onSubmit={handleAdd}>
          <div className="row">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Student name" />
            <input name="roll" value={form.roll} onChange={handleChange} placeholder="Roll no" />
          </div>
          <div className="row">
            <input name="math" value={form.math} onChange={handleChange} placeholder="Math marks" type="number" min="0" max="100" />
            <input name="science" value={form.science} onChange={handleChange} placeholder="Science marks" type="number" min="0" max="100" />
            <input name="english" value={form.english} onChange={handleChange} placeholder="English marks" type="number" min="0" max="100" />
          </div>
          <div className="row actions">
            <button type="submit" className="btn primary">Add Student</button>
            <button type="button" className="btn" onClick={() => setForm({ name: '', roll: '', math: '', science: '', english: '' })}>Reset</button>
          </div>
        </form>
      </section>

      <main>
        <div className="cards">
          {students.map((student) => (
            <StudentCard
              key={student.roll}
              name={student.name}
              roll={student.roll}
              marks={student.marks}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
