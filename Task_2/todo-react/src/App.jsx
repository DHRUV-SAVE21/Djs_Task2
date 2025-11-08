import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("All");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setInputValue("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev
        .map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
        .sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getTaskStats();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask(inputValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="todo-container">
        <header className="text-center mb-8">
          <h1>My To-Do List</h1>
          <div className="stats-container">
            <div className="stat-item total">Total: {stats.total}</div>
            <div className="stat-item completed">Done: {stats.completed}</div>
            <div className="stat-item active">Active: {stats.active}</div>
          </div>
        </header>

        <div className="todo-form-container">
          <div className="todo-form">
            <input
              type="text"
              placeholder="What needs to be done? ✨"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={() => addTask(inputValue)}>
              Add
            </button>
          </div>
        </div>

        <div className="filter-btns">
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "active" : ""}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <div className="task-content">
                <div 
                  className="task-checkbox"
                  onClick={() => toggleTask(task.id)}
                />
                <span 
                  className="task-text"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
              </div>
              <button 
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
                title="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <footer className="todo-footer">
            {stats.completed === stats.total && stats.total > 0 ? (
              <div className="completed-message">
                🎉 All tasks completed! Great job!
              </div>
            ) : (
              <div className="progress-message">
                Keep going! {stats.active} task{stats.active !== 1 ? 's' : ''} to go 💪
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;