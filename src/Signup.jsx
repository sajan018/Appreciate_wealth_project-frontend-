import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
        confirm_password: confirmPassword,
      });

      if (response.status === 200) {
        alert('Signup successful!');
        history.push('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data?.message || error.message);
      alert('Error during registration: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
