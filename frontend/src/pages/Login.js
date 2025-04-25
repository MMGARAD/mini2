import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (password.length < 8) {
      setError('Password must be 8+ characters');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/dashboard';
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Project Explorer Login</h2>
        
        {error && <Alert variant="danger" className="auth-alert">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="auth-input-group">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@college.com"
              className="auth-input" // Added className here
            />
          </Form.Group>

          <Form.Group className="auth-input-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="auth-input" // Added className here
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="auth-button"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;