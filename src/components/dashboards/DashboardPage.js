import React, { useState } from 'react';
import TasksPage from '../tasks/TasksPage';

const DashboardPage = ({ location }) => {
	const [dashboard, setDashboard] = useState(location.state && location.state.dashboard || {});
	return (
		<>
			<p>{dashboard.title}</p>
			<TasksPage/>
		</>
	)
};

export default DashboardPage;
