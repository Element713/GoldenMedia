// Calendar.js
import React from 'react';
import CalendarView from '../components/Calendar/CalendarView';

const Calendar = () => (
	<div>
		<h1>Family Calendar</h1>
		{/* TODO: Add event form and fetch events from backend */}
		<CalendarView events={[]} />
	</div>
);

export default Calendar;
