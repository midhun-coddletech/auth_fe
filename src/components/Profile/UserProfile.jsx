import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';
import { Link } from 'react-router-dom';
import './UserProfile.css'; // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user data');
        console.error(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        {user.role === 'Admin' && (
          <p>
            <Link to="/admin">Go to Admin Dashboard</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
