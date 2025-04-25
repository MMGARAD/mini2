// sidebar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    console.log('Logging out...');
    setShowLogoutConfirmation(false);
    navigate('/'); // Replace '/' with your actual login route
    // Add your actual logout logic here (e.g., clear localStorage, API call)
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  useEffect(() => {
    setShowLogoutConfirmation(false);
  }, [location]);

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <h4 className="text-white text-center py-3">Academic Project Explorer</h4>
        <ul className="nav flex-column px-3">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/guide" className="nav-link">Guide</Link>
          </li>
          <li className="nav-item">
            <Link to="/evaluation" className="nav-link">Evaluation</Link>
          </li>
          <li className="nav-item">
            <Link to="/notices" className="nav-link">Notices & Circulars</Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link">Project List</Link>
          </li>
          <li className="nav-item">
            <Link to="/student" className="nav-link">Student</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-user" className="nav-link">Add User</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogoutClick} className="nav-link logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <button className="toggle-btn btn btn-sm btn-light" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {showLogoutConfirmation && (
        <div className="logout-confirmation">
          <p>Are you sure you want to logout?</p>
          <button onClick={confirmLogout} className="btn btn-danger btn-sm">Yes, Logout</button>
          <button onClick={cancelLogout} className="btn btn-secondary btn-sm ml-2">Cancel</button>
        </div>
      )}
    </>
  );
}

export default Sidebar;