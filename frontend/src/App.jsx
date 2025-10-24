import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (title) => {
    try {
      await addTask(title);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdate = async (task) => {
    const newTitle = prompt("Edit task title", task.title);
    if (newTitle !== null) {
      try {
        await updateTask(task.id, newTitle, task.completed);
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #bfdbfe 0%, #c084fc 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{
          maxWidth: "600px",
          backgroundColor: "#ffffffd9",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body p-4">
          <h1 className="text-center mb-4 fw-bold text-primary">
            📝 Task Manager
          </h1>

          <TaskForm onAdd={handleAdd} />
          <TaskList
            tasks={tasks}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
