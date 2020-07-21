import React, { useState } from 'react';
import TasksPage from '../tasks/TasksPage';
import PageHeader from '../common/PageHeader';

const DashboardPage = ({ location }) => {
	const [dashboard, setDashboard] = useState((location.state && location.state.dashboard) || {});

	return (
		<>
			<PageHeader>{dashboard.title}</PageHeader>
			<TasksPage/>
		</>
	)
};

export default DashboardPage;
