import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error(error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Link to="/profile" className="profile-link">Go to Profile</Link>
      </div>
      <div className="dashboard-card">
        <h1>Admin Dashboard</h1>
        <h2>Users List</h2>
        {error && <div className="error">{error}</div>}
        <ul className="user-list">
          {users.map(user => (
            <li key={user._id}>
              <span>Name: {user.name}</span>
              <span>Email: {user.email}</span>
              <span>Role: {user.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
