import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as dashboardsActions from '../../redux/actions/dashboardsActions';
import DashboardDragDropContainer from './DashboardDragDropContainer';

const DashboardPage = ({ location, loadDashboard, resetDashboard, dashboardState }) => {
	// const dashboardTemp = (location.state && location.state.dashboard) || {};
	const slug = location.pathname.split('/').reverse()[0];
	const { dashboard, loadError } = dashboardState;

	useEffect(() => {
		loadDashboard(slug);
		return resetDashboard;
	}, [slug]);

	const handleColumnSave = () => {};
	const handleTaskSave = () => {};

	return (
		loadError
			?
			<Redirect to='/dashboards'/>
			:
			<>
				{dashboard.id &&
					<DashboardDragDropContainer
						dashboard={dashboard}
						handleColumnSave={handleColumnSave}
						handleTaskSave={handleTaskSave}
					/>
				}
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
