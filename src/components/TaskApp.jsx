import React, { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-8">
      {!nameSubmitted ? (
        <form onSubmit={handleUsernameSubmit} className="bg-white/10 backdrop-blur-lg text-white shadow-2xl rounded-3xl w-full max-w-lg p-10 space-y-6 transition-all duration-300">
          <h1 className="text-3xl font-bold text-center tracking-wide">Hey there 👋</h1>
          <input
            type="text"
            placeholder="What's your name?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-400"
          />
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all px-5 py-3 rounded-xl font-semibold shadow-md">
            Continue
          </button>
        </form>
      ) : (
        <div className="bg-white/10 backdrop-blur-2xl text-white shadow-2xl rounded-3xl w-full max-w-3xl p-8 md:p-10 space-y-8 transition-all duration-300">
          <h1 className="text-4xl font-bold text-center tracking-wider">📝 {username}'s Todo List</h1>

          <form onSubmit={addTask} className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-400"
            />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 transition-all px-6 py-3 rounded-xl font-semibold shadow-md w-full md:w-auto">
              Add
            </button>
          </form>
          <div className="flex justify-center flex-wrap gap-3">
            {['all', 'completed', 'pending'].map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-5 py-2 rounded-full font-medium capitalize shadow-sm transition-all duration-200 ${
                  filter === option ? 'bg-white text-black font-bold' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-600 pr-1">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex justify-between items-start bg-white/10 px-5 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.01] duration-200"
              >
                <div className="flex-1">
                  <p className={`text-lg font-medium ${task.completed ? 'line-through opacity-50' : ''}`}>{task.text}</p>
                  <small className="text-gray-300">Added on: {formatDate(task.createdAt)}</small>
                </div>
                <div className="flex gap-2 mt-1 md:mt-0">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      task.completed ? 'bg-green-600' : 'bg-gray-600'
                    } hover:brightness-110 transition-all`}
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-300 mt-4">No tasks to show 🚀</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
