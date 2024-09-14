import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('userEmail', email); // Store the user email in local storage
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      alert('Invalid credentials!'); // Display error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
