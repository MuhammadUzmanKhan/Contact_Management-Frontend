import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../services/context';
import './Login.css'
function Login() {
  const { setUser } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Add user login logic using Axios to your backend
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser({ ...response.data });
      navigate('/');
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> {/* Use a button element for form submission */}
      </form>
    </div>
  );
}

export default Login;
