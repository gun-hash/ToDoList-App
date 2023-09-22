import React, { useState, useRef, useEffect } from "react";
import TodoItems from "./ToDoItems.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const inputElementRef = useRef(null);

  const addTask = (e) => {
    e.preventDefault();
    if (inputElementRef.current.value !== "") {
      const newTask = {
        text: inputElementRef.current.value,
        key: Date.now(),
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));

      inputElementRef.current.value = "";

      toast.success("Task Added!");
    }
  };

  const deleteTask = (key) => {
    const filteredTasks = tasks.filter((task) => task.key !== key);
    setTasks(filteredTasks);

    localStorage.setItem('todoTasks', JSON.stringify(filteredTasks));

    toast.error("Task Removed!");
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    setTasks(savedTasks);
  }, []);

  return (
    <div className="main">
      <div className="header">
      <div className="taskManagerHeading">
        <h1>Task Manager</h1>
      </div>
        <form onSubmit={addTask}>
          <input
            ref={inputElementRef}
            placeholder="Enter Task"
          />
          <button type="submit" role="button">add</button>
        </form>
        <TodoItems entries={tasks} delete={deleteTask} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
