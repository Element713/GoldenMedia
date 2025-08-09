// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div>
		<h1>Welcome to GoldenMedia</h1>
		<nav>
			<Link to="/photos">Photos</Link> |{' '}
			<Link to="/calendar">Calendar</Link> |{' '}
			<Link to="/games">Games</Link>
		</nav>
		<section>
			<h2>Today’s Birthdays & Upcoming Events</h2>
			{/* TODO: Show birthdays/events from backend */}
		</section>
		<section>
			<h2>Recent Activity</h2>
			{/* TODO: Show recent uploads/events */}
		</section>
	</div>
);

export default Home;