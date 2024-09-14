import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './TodoApp';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  return (
    <Router>
      <div>
        <h1>To-Do Application</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<TodoApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
