import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import DashboardList from './DashboardList';
import * as dashboardActions from '../../redux/actions/dashboardsActions';

const DashboardsPage = ({ dashboards, loadDashboards }) => {
	useEffect(() => {
		if (dashboards.length === 0) {
			loadDashboards();
		}
	}, []);

	return (
		<>
			{dashboards.length > 0
				? <DashboardList dashboards={dashboards} />
				: <Alert severity='info'>Dashboards Not Found</Alert>
			}
		</>
	)
};

const mapStateToProps = state => {
	return {
		dashboards: state.dashboards,
	}
};
const mapDispatchToProps = dispatch => {
	return {
		loadDashboards: () => dispatch(dashboardActions.loadDashboards()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
