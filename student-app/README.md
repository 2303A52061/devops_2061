Student Marks Card — React (Vite)

This small React app demonstrates parent→child data flow using props.

Features
- `App` stores an array of students (name, roll, marks).
- `StudentCard` is a reusable child component that receives props and displays the data.
- `StudentCard` calculates the total and grade using the following rule:
  - Total >= 270 → Grade A
  - Total >= 200 → Grade B
  - Else → Grade C

Run locally
1. Change to the project folder:
```bash
cd "/Users/puppalamukeshbabu/devops2026/Devops 2026/feb2/student-app"
```
2. Install dependencies and start the dev server:
```bash
npm install
npm run dev
```
3. Open the local dev URL printed by Vite (usually http://localhost:5173)

Files
- `index.html` — app entry
- `src/main.jsx` — React entry
- `src/App.jsx` — parent component storing students and mapping to `StudentCard`
- `src/StudentCard.jsx` — child component (receives props and computes total/grade)
- `src/index.css` — basic styles

If you want, I can:
- Push this to a GitHub repo and set up GitHub Pages or Netlify for a public URL.
- Convert to TypeScript or add tests.
