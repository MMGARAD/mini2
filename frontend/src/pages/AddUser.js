import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Alert, Table } from 'react-bootstrap';
import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import '../styles/AddUser.css';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345678');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/list');
      setUsers(response.data.users); // Fixed data structure access
      setDeleteSuccessMessage('');
      setDeleteErrorMessage('');
      setSelectedUsers([]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    }
  }, []);

  useEffect(() => {
    if (showUsers) {
      fetchUsers();
    }
  }, [showUsers, fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/add', {
        email,
        password,
      });
      setSuccess(true);
      setError('');
      setEmail('');
      setPassword('12345678');
      if (showUsers) fetchUsers();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add user');
      setSuccess(false);
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelectedUsers = async () => {
    if (selectedUsers.length === 0) {
      setDeleteErrorMessage('Please select at least one user to delete');
      setTimeout(() => setDeleteErrorMessage(''), 3000);
      return;
    }

    try {
      await Promise.all(
        selectedUsers.map(userId =>
          axios.delete(`http://localhost:5000/api/users/delete/${userId}`)
        )
      );
      setDeleteSuccessMessage(`${selectedUsers.length} user(s) deleted successfully`);
      await fetchUsers();
      setSelectedUsers([]); // Clear selection after delete
    } catch (err) {
      setDeleteErrorMessage(err.response?.data?.error || 'Failed to delete selected users');
    }

    setTimeout(() => {
      setDeleteSuccessMessage('');
      setDeleteErrorMessage('');
    }, 3000);
  };

  return (
    <div className="add-user-container">
      <div className={`auth-box ${showUsers ? 'show-users-view' : ''}`}>
        <h2 className="auth-title">User Management</h2>

        {showUsers ? (
          <div className="user-list">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Registered Users</h4>
              <Button variant="secondary" onClick={() => setShowUsers(false)}>
                Hide Users
              </Button>
            </div>

            {deleteSuccessMessage && <Alert variant="success">{deleteSuccessMessage}</Alert>}
            {deleteErrorMessage && <Alert variant="danger">{deleteErrorMessage}</Alert>}

            <div className="mb-3">
              <Button
                variant="danger"
                onClick={handleDeleteSelectedUsers}
                disabled={selectedUsers.length === 0}
              >
                <FiTrash2 /> Delete Selected ({selectedUsers.length})
              </Button>
            </div>

            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>Select</th>
                  <th>Email</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user._id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleCheckboxChange(user._id)}
                        />
                      </td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No users found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        ) : (
          <>
            {success && <Alert variant="success">User added successfully!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="auth-input-group">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="auth-input-group">
                <Form.Label>Password</Form.Label>
                <div className="password-input-wrapper">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </Form.Group>

              <div className="auth-action">
                <Button variant="primary" type="submit" className="auth-button">
                  Add User
                </Button>
              </div>
            </Form>

            <div className="mt-3 text-center">
              <Button
                variant="outline-secondary"
                onClick={() => setShowUsers(true)}
                className="auth-button-secondary"
              >
                View All Users
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUser;