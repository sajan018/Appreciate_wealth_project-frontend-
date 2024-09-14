import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const userEmail = localStorage.getItem('userEmail'); // Get the logged-in user's email

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTodo = () => {
    if (!userEmail) {
      window.alert('Please log in to add tasks.');
      return;
    }

    if (task) {
      axios.post('http://localhost:5000/todos', { task, email: userEmail })
        .then(response => {
          setTodos([...todos, { task, user_id: userEmail }]);
          setTask('');
          window.alert('Task added successfully!');
        })
        .catch(error => {
          console.error(error);
          window.alert('Failed to add task.');
        });
    } else {
      window.alert('Task cannot be empty.');
    }
  };

  const handleDeleteTodo = (taskToDelete) => {
    if (!userEmail) {
      window.alert('Please log in to delete tasks.');
      return;
    }

    axios.delete(`http://localhost:5000/todos/${taskToDelete}`, { data: { email: userEmail } })
      .then(response => {
        setTodos(todos.filter(todo => todo.task !== taskToDelete));
        window.alert('Task deleted successfully!');
      })
      .catch(error => {
        console.error(error);
        window.alert('Failed to delete task.');
      });
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
            {todo.task}
            {userEmail === todo.user_id && (
              <button onClick={() => handleDeleteTodo(todo.task)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
