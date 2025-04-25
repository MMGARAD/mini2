import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/list');
      setUsers(res.data.users); // Fixed data structure access
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.error || 'Failed to fetch users');
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleDelete = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user to delete.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUsers.length} user(s)?`
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedUsers.map(userId =>
          axios.delete(`http://localhost:5000/api/users/delete/${userId}`)
        )
      );
      setSelectedUsers([]);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting users:', err);
      alert(err.response?.data?.error || 'Failed to delete users');
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      {error && <p className="error-message">{error}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="delete-section">
        <button
          onClick={handleDelete}
          className="delete-button"
          disabled={selectedUsers.length === 0}
        >
          Delete Selected ({selectedUsers.length})
        </button>
      </div>
    </div>
  );
};

export default UserList;