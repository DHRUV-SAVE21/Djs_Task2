import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="flex flex-col gap-3">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400 py-4 text-lg">No tasks yet!</p>
      ) : (
        tasks.map((task) => (
          <TodoItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))
      )}
    </ul>
  );
}

export default TodoList;
