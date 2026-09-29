// Task Management Logic with localStorage persistence

const STORAGE_KEY = 'todo_python_web_tasks';

// Default tasks if storage is empty
const DEFAULT_TASKS = [
    { id: 1, title: 'Learn Python basics & CRUD operations', completed: true, priority: 'high', createdAt: new Date().toISOString() },
    { id: 2, title: 'Build command-line To-Do app (todo.py)', completed: true, priority: 'medium', createdAt: new Date().toISOString() },
    { id: 3, title: 'Deploy Web interface to GitHub Pages', completed: false, priority: 'high', createdAt: new Date().toISOString() }
];

// State
let tasks = [];
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const taskForm = document.getElementById('add-task-form');
const taskTitleInput = document.getElementById('task-title');
const taskPrioritySelect = document.getElementById('task-priority');
const taskListEl = document.getElementById('task-list');
const emptyStateEl = document.getElementById('empty-state');
const emptyMsgEl = document.getElementById('empty-msg');
const searchInput = document.getElementById('search-input');
const tabButtons = document.querySelectorAll('.tab-btn');

// Stats Elements
const totalCountEl = document.getElementById('total-count');
const pendingCountEl = document.getElementById('pending-count');
const completedCountEl = document.getElementById('completed-count');
const progressFillEl = document.getElementById('progress-fill');
const progressTextEl = document.getElementById('progress-text');

// Footer Actions
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const exportJsonBtn = document.getElementById('export-json-btn');

// Initialize Application
function init() {
    loadTasks();
    setupEventListeners();
    render();
}

// Load tasks from LocalStorage
function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse saved tasks', e);
            tasks = DEFAULT_TASKS;
        }
    } else {
        tasks = DEFAULT_TASKS;
        saveTasks();
    }
}

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Setup Event Handlers
function setupEventListeners() {
    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const priority = taskPrioritySelect.value;
        if (!title) return;

        const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
        const newTask = {
            id: maxId + 1,
            title: title,
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask);
        saveTasks();
        taskTitleInput.value = '';
        render();
    });

    // Filter tabs
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        render();
    });

    // Clear completed
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter((t) => !t.completed);
        saveTasks();
        render();
    });

    // Export tasks.json (downloads JSON matching todo.py format)
    exportJsonBtn.addEventListener('click', () => {
        const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 4));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", jsonString);
        downloadAnchor.setAttribute("download", "tasks.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
}

// Filter & Search tasks
function getFilteredTasks() {
    return tasks.filter((task) => {
        // Filter by tab status
        if (currentFilter === 'pending' && task.completed) return false;
        if (currentFilter === 'completed' && !task.completed) return false;

        // Filter by search query
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery)) return false;

        return true;
    });
}

// Toggle Task Complete
function toggleTask(id) {
    tasks = tasks.map((task) => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    render();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    render();
}

// Render Dashboard & Task List
function render() {
    updateStats();

    const filteredTasks = getFilteredTasks();

    taskListEl.innerHTML = '';

    if (filteredTasks.length === 0) {
        emptyStateEl.classList.remove('hidden');
        if (searchQuery) {
            emptyMsgEl.textContent = `No tasks matching "${searchQuery}"`;
        } else if (currentFilter === 'completed') {
            emptyMsgEl.textContent = 'No completed tasks yet.';
        } else if (currentFilter === 'pending') {
            emptyMsgEl.textContent = 'No pending tasks! Enjoy your day!';
        } else {
            emptyMsgEl.textContent = 'Your task list is empty. Add a new task above!';
        }
    } else {
        emptyStateEl.classList.add('hidden');
        filteredTasks.forEach((task) => {
            const li = createTaskElement(task);
            taskListEl.appendChild(li);
        });
    }
}

// Create Task Item DOM
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const priorityClass = `badge-${task.priority || 'medium'}`;

    li.innerHTML = `
        <div class="task-left">
            <div class="checkbox-custom" onclick="toggleTask(${task.id})" role="button" tabindex="0" aria-label="Toggle task">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="task-content">
                <span class="task-text">${escapeHtml(task.title)}</span>
                <div class="task-meta">
                    <span class="badge ${priorityClass}">${task.priority || 'medium'}</span>
                    <span class="task-id">#${task.id}</span>
                </div>
            </div>
        </div>
        <div class="task-actions">
            <button class="icon-btn" onclick="deleteTask(${task.id})" aria-label="Delete task" title="Delete Task">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    `;

    return li;
}

// Update Stats Dashboard
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    totalCountEl.textContent = total;
    pendingCountEl.textContent = pending;
    completedCountEl.textContent = completed;
    progressFillEl.style.width = `${percent}%`;
    progressTextEl.textContent = `${percent}% Done`;
}

// Utility: Escape HTML
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

// Run app
document.addEventListener('DOMContentLoaded', init);
