
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Photos from './pages/Photos';
import Games from './pages/Games';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
	const [token, setToken] = useState(() => localStorage.getItem('token'));

	const handleLogin = (tok) => {
		setToken(tok);
		localStorage.setItem('token', tok);
	};
	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	return (
		<Router>
			<Navbar token={token} onLogout={handleLogout} />
			<main style={{ minHeight: '80vh', padding: '1rem' }}>
				<Routes>
					{!token && <>
						<Route path="/login" element={<Login onLogin={handleLogin} />} />
						<Route path="/signup" element={<Signup onSignup={handleLogin} />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</>}
					{token && <>
						<Route path="/" element={<Home />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/photos" element={<Photos />} />
						<Route path="/games" element={<Games />} />
						<Route path="/calendar" element={<Calendar />} />
						<Route path="*" element={<Navigate to="/" />} />
					</>}
				</Routes>
			</main>
			<Footer />
		</Router>
	);
}

export default App;

