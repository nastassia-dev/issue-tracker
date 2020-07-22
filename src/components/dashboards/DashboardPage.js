import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import TasksPage from '../tasks/TasksPage';
import PageHeader from '../common/PageHeader';
import * as dashboardsActions from '../../redux/actions/dashboardsActions';

const DashboardPage = ({ location, loadDashboard, resetDashboard, dashboardState }) => {
	const dashboardTemp = (location.state && location.state.dashboard) || {};
	const slug = location.pathname.split('/').reverse()[0];
	const { dashboard, loadError } = dashboardState;
	useEffect(() => {
		loadDashboard(slug);
		return resetDashboard;
	}, [slug]);

	return (
		<>
			{loadError && <Redirect to='/dashboards' />}
			<PageHeader>{dashboard.title || dashboardTemp.title}</PageHeader>
			<TasksPage/>
		</>
	)
};

const mapStateToProps = state => ({
	dashboardState: state.dashboard,
});
const mapDispatchToProps = dispatch => {
	return {
		loadDashboard: (id) => dispatch(dashboardsActions.loadDashboard(id)),
		resetDashboard: () => dispatch(dashboardsActions.resetDashboard()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
