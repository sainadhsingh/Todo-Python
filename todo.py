import json
import os

FILENAME = "tasks.json"

def load_tasks():
    """Load tasks from the JSON file. Return an empty list if file doesn't exist or is invalid."""
    if not os.path.exists(FILENAME):
        return []
    try:
        with open(FILENAME, "r") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        return []

def save_tasks(tasks):
    """Write the list of tasks to tasks.json."""
    with open(FILENAME, "w") as file:
        json.dump(tasks, file, indent=4)

def add_task(tasks):
    """Ask for task title, generate unique ID, and save new task."""
    title = input("Enter task title: ").strip()
    if not title:
        print("Error: Task title cannot be empty.")
        return

    highest_id = max([task["id"] for task in tasks], default=0)
    new_task = {
        "id": highest_id + 1,
        "title": title,
        "completed": False
    }
    tasks.append(new_task)
    save_tasks(tasks)
    print(f"Task '{title}' added successfully.")

def view_tasks(tasks):
    """Print all tasks with their ID, title, and status."""
    if not tasks:
        print("\nNo tasks found.")
        return

    print("\n--- Your To-Do List ---")
    for task in tasks:
        status = "Completed" if task["completed"] else "Pending"
        print(f"ID: {task['id']} | Title: {task['title']} | Status: {status}")

def complete_task(tasks):
    """Mark a task as completed by matching its task ID."""
    if not tasks:
        print("\nNo tasks available to mark as completed.")
        return

    try:
        task_id = int(input("Enter task ID to mark as completed: "))
    except ValueError:
        print("Error: Please enter a valid numeric task ID.")
        return

    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
            save_tasks(tasks)
            print(f"Task ID {task_id} marked as completed.")
            return

    print(f"Error: Task with ID {task_id} not found.")

def delete_task(tasks):
    """Remove a task from the list by its ID."""
    if not tasks:
        print("\nNo tasks available to delete.")
        return

    try:
        task_id = int(input("Enter task ID to delete: "))
    except ValueError:
        print("Error: Please enter a valid numeric task ID.")
        return

    for i, task in enumerate(tasks):
        if task["id"] == task_id:
            deleted = tasks.pop(i)
            save_tasks(tasks)
            print(f"Task '{deleted['title']}' deleted successfully.")
            return

    print(f"Error: Task with ID {task_id} not found.")

def show_menu():
    """Print the menu options to the console."""
    print("\n=== TO-DO LIST MENU ===")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Mark Task as Completed")
    print("4. Delete Task")
    print("5. Exit")

def main():
    """Run the main menu loop."""
    tasks = load_tasks()
    while True:
        show_menu()
        choice = input("Choose an option (1-5): ").strip()

        if choice == "1":
            add_task(tasks)
        elif choice == "2":
            view_tasks(tasks)
        elif choice == "3":
            complete_task(tasks)
        elif choice == "4":
            delete_task(tasks)
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice! Please choose an option from 1 to 5.")

if __name__ == "__main__":
    main()
