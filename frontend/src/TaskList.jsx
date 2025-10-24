import React from 'react';

export default function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <ul className="list-unstyled mx-auto" style={{ maxWidth: '100%' }}>
      {tasks.map(task => (
        <li 
          key={task.id} 
          className="d-flex justify-content-between align-items-center mb-3 p-3 shadow-sm rounded-3 bg-light"
        >
          <span>
            {task.completed ? (
              <span className="badge bg-success me-2">Done</span>
            ) : (
              <span className="badge bg-warning text-dark me-2">Pending</span>
            )}
            {task.title}
          </span>
          <div>
            <button 
              className="btn btn-sm btn-outline-primary me-2" 
              onClick={() => onUpdate(task)}
            >
              ✏️ Edit
            </button>
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={() => onDelete(task.id)}
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
