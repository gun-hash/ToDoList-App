import React from "react";

const removeFromLocalStorage = (key) => {
  const storedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
  const updatedTasks = storedTasks.filter((task) => task.key !== key);
  localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));
};

const TodoItems = ({ entries, delete: deleteTask }) => {
  const createTasks = (task) => {
    return (
      <li onClick={() => {
        deleteTask(task.key);
        removeFromLocalStorage(task.key);
      }} key={task.key}>
        {task.text}
      </li>
    );
  };

  const listItems = entries.map(createTasks);

  return <ul className="taskList">{listItems}</ul>;
};

export default TodoItems;
