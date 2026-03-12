import React from 'react'

// StudentCard - child component
// Props: name (string), roll (string), marks (object)
// Calculates total and grade using bonus grading rules
export default function StudentCard({ name, roll, marks = {} }) {
  const entries = Object.entries(marks)
  const numericMarks = entries.map(([_, v]) => Number(v)).filter((n) => !Number.isNaN(n))
  const total = numericMarks.reduce((a, b) => a + b, 0)
  const maxTotal = numericMarks.length * 100 || 300

  // Bonus grade logic:
  // Total >= 270 → Grade A
  // Total >= 200 → Grade B
  // Else → Grade C
  const grade = (() => {
    if (total >= 270) return 'A'
    if (total >= 200) return 'B'
    return 'C'
  })()

  const pct = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0

  const gradeColor = grade === 'A' ? 'var(--grade-a)' : grade === 'B' ? 'var(--grade-b)' : 'var(--grade-c)'

  return (
    <div className="card">
      <div className="card-head">
        <h2>{name}</h2>
        <span className="badge" style={{ background: gradeColor }}>{grade}</span>
      </div>

      <p className="muted"><strong>Roll:</strong> {roll}</p>

      <div className="marks">
        {entries.length === 0 ? (
          <p className="muted">No marks provided</p>
        ) : (
          <ul>
            {entries.map(([subject, value]) => (
              <li key={subject}><strong>{subject}:</strong> {value}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="summary">
        <div className="total">
          <div>
            <strong>Total:</strong> {total} / {maxTotal}
          </div>
          <div className="progress" aria-hidden>
            <div className="progress-bar" style={{ width: `${pct}%`, background: gradeColor }} />
          </div>
        </div>
      </div>
    </div>
  )
}
