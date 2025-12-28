import React, { useState } from "react";

function TodoForm({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a task!");
      return;
    }
    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-3 border-2 border-indigo-300 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
