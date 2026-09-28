# Simple Command-Line To-Do List Application

A beginner-friendly Python command-line To-Do List application that performs CRUD (Create, Read, Update, Delete) operations using Python's standard library.

## Features

1. **Add Task:** Create a new task with a title. Auto-generates unique IDs.
2. **View Tasks:** List all existing tasks along with their ID, title, and completion status (`Pending` or `Completed`).
3. **Mark Task as Completed:** Update task status to completed using its ID.
4. **Delete Task:** Remove a task by its ID.
5. **JSON Persistence:** Tasks are stored in `tasks.json` in the same directory and updated after every operation.

## Prerequisites

- Python 3.x (Uses standard modules `json` and `os`; no external libraries required).

## How to Run

1. Open a terminal / command prompt in the directory containing `todo.py`.
2. Run the application:
   ```bash
   python todo.py
   ```
3. Follow the menu options (1-5) displayed on screen.

## Project Files

- `todo.py`: The single-file source code containing all functions and menu logic.
- `tasks.json`: Automatically created JSON file storing task data.
