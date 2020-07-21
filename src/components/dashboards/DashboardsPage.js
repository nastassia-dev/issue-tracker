import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import FloatingBtn from '../common/FloatingBtn';
import DashboardList from './DashboardList';
import * as dashboardActions from '../../redux/actions/dashboardsActions';

const DashboardsPage = ({ history, dashboardsState: { dashboards }, loadDashboards, saveDashboard, deleteDashboard }) => {
	useEffect(() => {
		loadDashboards();
	}, []);
	const handleAddDashboard = (e) => {
		e.preventDefault();
		history.push('/dashboard');
	};
	const handleViewDashboard = dashboard => {
		history.push({
			pathname: `/dashboard/${dashboard.slug}`,
			state: { dashboard }
		})
	};
	console.log(dashboards);
	const handleArchiveDashboard = dashboard => {
		saveDashboard({ ...dashboard, status: 'archived' });
	};
	const handleDeleteDashboard = dashboard => {
		// TODO ask to confirm delete
		deleteDashboard(dashboard);

	};
	const dashboardActions = { handleViewDashboard, handleArchiveDashboard, handleDeleteDashboard };

	return (
		<>
			{dashboards.length > 0
				? <DashboardList dashboards={dashboards} dashboardActions={dashboardActions} />
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
		dashboardsState: state.dashboards,
	}
};
const mapDispatchToProps = dispatch => {
	return {
		loadDashboards: () => dispatch(dashboardActions.loadDashboards()),
		saveDashboard: (dashboard) => dispatch(dashboardActions.saveDashboard(dashboard)),
		deleteDashboard: (dashboard) => dispatch(dashboardActions.deleteDashboard(dashboard)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
