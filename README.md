# Todo-Python (Web App & CLI)

A modern, full-featured To-Do List Application available both as a **Live Web App** (hosted on GitHub Pages) and a **Python Command-Line Interface (CLI)**.

---

## 🌐 Live Web Application (GitHub Pages)

Experience the application directly in your web browser with a modern glassmorphism interface!

- **Live URL:** `https://sainadhsingh.github.io/Todo-Python/`
- **Features:**
  - 📊 Real-time completion dashboard & progress bar.
  - ⚡ Add, filter (All, Pending, Completed), and search tasks instantly.
  - 🏷️ Priority tags (Low, Medium, High).
  - 💾 Automatic browser persistence via LocalStorage.
  - 📥 Export task lists directly as `tasks.json`.

---

## 💻 Python Command-Line Interface (`todo.py`)

Run the application locally in your terminal:

```bash
python todo.py
```

### Features
1. **Add Task:** Create a new task with auto-generated unique IDs.
2. **View Tasks:** List all tasks with status (`Pending` or `Completed`).
3. **Mark Task as Completed:** Update task status by ID.
4. **Delete Task:** Remove task by ID.
5. **JSON Persistence:** Tasks automatically save to `tasks.json`.

---

## 📁 Repository Structure

- `index.html`: Web interface HTML5 structure.
- `style.css`: Sleek glassmorphism dark mode styles.
- `app.js`: Web logic, filtering, search, and local storage management.
- `todo.py`: Python CLI application.
- `README.md`: Project documentation.
