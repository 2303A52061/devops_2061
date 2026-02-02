Student Marks Card — simple React example (no build)

What this is
- A minimal parent→child React demo where `App` stores student objects and passes them to `StudentCard` via props.
- `StudentCard` displays marks, calculates total, percentage and a grade.
- The example uses React + Babel from CDN so no npm install or build required.

Files
- `index.html` — the complete demo. Open in a browser or serve from a static server.

How to run
- Option 1: Open `index.html` directly in your browser (double-click the file).
- Option 2: Serve it locally (recommended so React works consistently):

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes
- `App` contains a `students` array and maps over it to render a `StudentCard` for each student — demonstrating reuse.
- `StudentCard` handles missing or non-numeric marks gracefully and shows `N/A` when appropriate.

Requirements coverage
- Store student details in `App`: Done (students array in `App`).
- Pass data to `StudentCard` using props: Done (props: name, roll, marks).
- Display received data in child: Done (renders name, roll, marks).
- Bonus — calculate total and grade in child: Done (total, percentage, grade computed inside `StudentCard`).
- Reuse component for multiple students: Done (mapped over `students`).

If you want this converted into a create-react-app / Vite project with TypeScript and tests, I can scaffold that next.
