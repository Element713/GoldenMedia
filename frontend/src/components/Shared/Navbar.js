// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      {token && <>
        <Link to="/profile">Profile</Link>
        <Link to="/photos">Photos</Link>
        <Link to="/games">Games</Link>
        <Link to="/calendar">Calendar</Link>
        <button onClick={handleLogout}>Logout</button>
      </>}
      {!token && <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>}
    </nav>
  );
};

export default Navbar;
