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
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex items-center justify-center px-4 py-8">
      {!nameSubmitted ? (
        <form onSubmit={handleUsernameSubmit} className="bg-white/80 backdrop-blur-lg text-gray-800 shadow-2xl rounded-3xl w-full max-w-lg p-10 space-y-6 transition-all duration-300 border border-pink-100">
          <h1 className="text-3xl font-bold text-center tracking-wide">Hey there 👋</h1>
          <input
            type="text"
            placeholder="What's your name?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-xl text-gray-800 placeholder-gray-500 bg-white focus:outline-none focus:ring-4 focus:ring-pink-200 shadow-md"
          />
          <button type="submit" className="w-full bg-pink-300 hover:bg-pink-400 text-white transition-all px-5 py-3 rounded-xl font-semibold shadow-md">
            Continue
          </button>
        </form>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl text-gray-800 shadow-2xl rounded-3xl w-full max-w-3xl p-8 md:p-10 space-y-8 transition-all duration-300 border border-pink-100">
          <h1 className="text-4xl font-bold text-center tracking-wider text-pink-500">📝 {username}'s Todo List</h1>

          <form onSubmit={addTask} className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-xl text-gray-800 placeholder-gray-500 bg-white focus:outline-none focus:ring-4 focus:ring-pink-200 shadow"
            />
            <button type="submit" className="bg-pink-300 hover:bg-pink-400 text-white transition-all px-6 py-3 rounded-xl font-semibold shadow-md w-full md:w-auto">
              Add
            </button>
          </form>

          <div className="flex justify-center flex-wrap gap-3">
            {['all', 'completed', 'pending'].map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-5 py-2 rounded-full font-medium capitalize shadow-md transition-all duration-200 ${
                  filter === option
                    ? 'bg-white text-pink-600 font-bold border border-pink-200'
                    : 'bg-pink-100 hover:bg-pink-200 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100 pr-1">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex justify-between items-start bg-white px-5 py-4 rounded-2xl shadow-md transition-all hover:scale-[1.01] duration-200 border border-pink-100"
              >
                <div className="flex-1">
                  <p className={`text-lg font-medium ${task.completed ? 'line-through opacity-50' : ''}`}>{task.text}</p>
                  <small className="text-gray-500">Added on: {formatDate(task.createdAt)}</small>
                </div>
                <div className="flex gap-2 mt-1 md:mt-0">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-white transition-all ${
                      task.completed ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-300 hover:bg-red-400 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-400 mt-4">No tasks to show 🌸</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
