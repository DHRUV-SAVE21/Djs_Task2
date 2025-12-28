import React from "react";

function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl shadow hover:bg-indigo-50 transition-all">
      <span
        onClick={() => toggleTask(task.id)}
        className={`cursor-pointer flex-1 text-lg transition-colors ${
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 font-semibold ml-4 px-3 py-1 rounded-lg transition-colors"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
