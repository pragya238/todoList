import React, { useState } from 'react';
import './App.css'; // ✨ Import CSS here

const App = () => {
  const [username, setUsername] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') setNameSubmitted(true);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const toggleComplete = (id) =>
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container">
      {!nameSubmitted ? (
        <form onSubmit={handleUsernameSubmit} className="form-box">
          <h1 className="title">Hey there 👋</h1>
          <input
            type="text"
            placeholder="What's your name?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn primary">Continue</button>
        </form>
      ) : (
        <div className="todo-box">
          <h1 className="todo-title">📝 {username}'s Todo List</h1>

          <form onSubmit={addTask} className="task-form">
            <input
              type="text"
              placeholder="Enter a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input"
            />
            <button type="submit" className="btn primary">Add</button>
          </form>

          <div className="filters">
            {['all', 'completed', 'pending'].map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`btn filter-btn ${filter === option ? 'active' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-content">
                  <p className={`task-text ${task.completed ? 'done' : ''}`}>{task.text}</p>
                  <small className="timestamp">Added on: {formatDate(task.createdAt)}</small>
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`btn ${task.completed ? 'green' : 'gray'}`}
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn red"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <p className="no-tasks">No tasks to show 🚀</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
