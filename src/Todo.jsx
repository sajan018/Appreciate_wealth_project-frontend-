import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState('');

  // Fetch all todos on initial load
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  // Add new todo
  const handleAddTodo = () => {
    if (task) {
      axios.post('http://localhost:5000/todos', { task })
        .then(response => {
          setTodos([...todos, { task }]);
          setTask('');
        })
        .catch(error => console.error(error));
    }
  };

  // Delete todo
  const handleDeleteTodo = (taskToDelete) => {
    axios.delete(`http://localhost:5000/todos/${taskToDelete}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.task !== taskToDelete));
      })
      .catch(error => console.error(error));
  };

  // Start editing a todo
  const handleEditTodo = (taskToEdit) => {
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit);  // Pre-fill the input with the existing task value
  };

  // Update a todo
  const handleUpdateTodo = (taskToUpdate) => {
    if (newTask) {
      axios.put(`http://localhost:5000/todos/${taskToUpdate}`, { task: newTask })
        .then(response => {
          setTodos(todos.map(todo => todo.task === taskToUpdate ? { task: newTask } : todo));
          setEditingTask(null);
          setNewTask('');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingTask === todo.task ? (
              <>
                <input
                  type="text"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo.task)}>Update</button>
              </>
            ) : (
              <>
                {todo.task}
                <button onClick={() => handleEditTodo(todo.task)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.task)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
