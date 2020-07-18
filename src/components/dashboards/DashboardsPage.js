import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import FloatingBtn from '../common/FloatingBtn';
import DashboardList from './DashboardList';
import * as dashboardActions from '../../redux/actions/dashboardsActions';

const DashboardsPage = ({ history, dashboards, loadDashboards }) => {
	useEffect(() => {
		loadDashboards();
	}, []);
	const handleAddDashboard = (e) => {
		e.preventDefault();
		history.push('/dashboard');
	};

	return (
		<>
			{dashboards.length > 0
				? <DashboardList dashboards={dashboards} />
				: <Alert severity='info'>Dashboards Not Found</Alert>
			}
			<FloatingBtn color='primary' tooltipTitle='Create New Dashboard' onClick={handleAddDashboard}>
				<AddIcon />
			</FloatingBtn>
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
