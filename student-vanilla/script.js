// Student Marks Card — Vanilla JS
// Adds student cards dynamically, handles dark mode, computes grade & progress,
// and improves UX with persistence and toasts

const form = document.getElementById('studentForm')
const cardsContainer = document.getElementById('cards')
const resetBtn = document.getElementById('resetBtn')
const themeToggle = document.getElementById('themeToggle')
const yearSpan = document.getElementById('year')

// Set current year in footer
yearSpan.textContent = new Date().getFullYear()

// Utils
function clamp(n, min = 0, max = 100) { return Math.max(min, Math.min(max, Number(n) || 0)) }

// Grade logic
// A >= 240
// B >= 200
// C < 200
function computeGrade(total) {
  if (total >= 240) return 'A'
  if (total >= 200) return 'B'
  return 'C'
}

function badgeClassForGrade(g) {
  if (g === 'A') return 'badge a'
  if (g === 'B') return 'badge b'
  return 'badge c'
}

// Sanitize text for HTML insertion (very small helper)
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Create a card DOM element for a student
function createCard({ name, roll, math, science, english }) {
  const total = clamp(math) + clamp(science) + clamp(english)
  const grade = computeGrade(total)
  const pct = Math.round((total / 300) * 100)

  const card = document.createElement('article')
  card.className = 'card card-enter'
  card.setAttribute('tabindex', '0')

  card.innerHTML = `
    <div class="card-head">
      <h3>${escapeHtml(name)}</h3>
      <span class="${badgeClassForGrade(grade)}" aria-label="Grade ${grade}">${grade}</span>
    </div>
    <div class="muted">Roll: ${escapeHtml(roll)}</div>

    <ul class="marks-list">
      <li><strong>Math:</strong> ${clamp(math)}</li>
      <li><strong>Science:</strong> ${clamp(science)}</li>
      <li><strong>English:</strong> ${clamp(english)}</li>
    </ul>

    <div class="summary">
      <div class="total"><div><strong>Total:</strong> ${total} / 300</div><div class="muted">${pct}%</div></div>
      <div class="progress" aria-hidden>
        <div class="progress-bar" style="width:${pct}%"></div>
      </div>
    </div>
  `

  // If high grade, add animated gradient class later when inserted
  // Remove the enter class after animation completes
  setTimeout(() => card.classList.remove('card-enter'), 700)

  return card
}

// Toast helper
const toastRoot = document.getElementById('toast')
function showToast(message, type = 'info', ms = 2600) {
  if (!toastRoot) return
  const note = document.createElement('div')
  note.className = `note ${type}`
  note.textContent = message
  toastRoot.appendChild(note)
  setTimeout(() => {
    note.style.opacity = '0'
    note.style.transform = 'translateY(8px) scale(.98)'
    setTimeout(() => note.remove(), 360)
  }, ms)
}

// Small animation for A-grade cards (pulse)
function animateA(card) {
  const badge = card.querySelector('.badge.a')
  if (!badge) return
  badge.animate([
    { transform: 'scale(1)', boxShadow: '0 8px 26px rgba(16,185,129,0.12)' },
    { transform: 'scale(1.06)', boxShadow: '0 14px 36px rgba(16,185,129,0.16)' },
    { transform: 'scale(1)', boxShadow: '0 8px 26px rgba(16,185,129,0.12)' }
  ], { duration: 900, easing: 'ease-in-out' })
}

// Persistence: load students from localStorage or seed demo data
const STORAGE_KEY = 'student_cards_v1'
function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return [
    { name: 'Alice', roll: 'A01', math: 95, science: 88, english: 92 },
    { name: 'Bob', roll: 'B02', math: 72, science: 65, english: 70 },
    { name: 'Charlie', roll: 'C03', math: 45, science: 55, english: 50 },
  ]
}

function saveStudentList(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch (e) { /* ignore */ }
}

let students = loadStudents()

// Render existing students
students.forEach(s => {
  const card = createCard(s)
  // if grade A, add gradient class and animate after insertion
  const total = clamp(s.math) + clamp(s.science) + clamp(s.english)
  const grade = computeGrade(total)
  cardsContainer.appendChild(card)
  if (grade === 'A') {
    const pb = card.querySelector('.progress-bar')
    if (pb) {
      pb.classList.add('animate-gradient')
    }
    setTimeout(() => animateA(card), 300)
  }
})

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const student = {
    name: data.get('name').trim(),
    roll: data.get('roll').trim(),
    math: Number(data.get('math')) || 0,
    science: Number(data.get('science')) || 0,
    english: Number(data.get('english')) || 0,
  }

  // Simple validation
  if (!student.name || !student.roll) {
    showToast('Please enter student name and roll number.', 'info')
    return
  }

  const card = createCard(student)
  // Prepend so newest students appear first
  cardsContainer.prepend(card)

  // Smooth focus to the new card for accessibility
  card.focus()

  // Reset form but keep focus on name field
  form.reset()
  form.name.focus()

  // Add to local storage list
  students.unshift(student)
  saveStudentList(students)
  showToast('Student added', 'success')

  // If A grade, add animated gradient and pulse
  const total = clamp(student.math) + clamp(student.science) + clamp(student.english)
  const grade = computeGrade(total)
  if (grade === 'A') {
    const pb = card.querySelector('.progress-bar')
    if (pb) pb.classList.add('animate-gradient')
    setTimeout(() => animateA(card), 260)
  }
})

// Reset button clears the form
resetBtn.addEventListener('click', () => {
  form.reset()
  form.name.focus()
})

// Theme toggle — toggles body.dark and remembers preference in localStorage
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark)
  themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false')
  themeToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode'
}

const stored = localStorage.getItem('student_theme')
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
let isDark = stored ? stored === 'dark' : prefersDark
applyTheme(isDark)

themeToggle.addEventListener('click', () => {
  isDark = !isDark
  applyTheme(isDark)
  localStorage.setItem('student_theme', isDark ? 'dark' : 'light')
})

// Accessibility: keyboard shortcut 'D' toggles dark mode
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'd' && (e.ctrlKey || e.metaKey)) {
    isDark = !isDark
    applyTheme(isDark)
    localStorage.setItem('student_theme', isDark ? 'dark' : 'light')
  }
})
