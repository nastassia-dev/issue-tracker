import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import FloatingBtn from '../common/FloatingBtn';
import DashboardList from './DashboardList';
import ManageDashboardDialog from './ManageDashboardDialog';
import * as dashboardActions from '../../redux/actions/dashboardsActions';

const DashboardsPage = ({
	                        history,
	                        dashboardsState: { active, archived, total },
	                        loadDashboards,
	                        saveDashboard,
	                        resetDashboard,
	                        deleteDashboard
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dashboard, setDashboard] = useState(null);
	useEffect(() => {
		loadDashboards();
	}, []);
	const handleAddIconClick = () => setIsDialogOpen(true);
/*	const handleDashboardSave = dashboard => {
		//TODO change to optimistic update
		saveDashboard(dashboard)
			.then(res => {
				setIsDialogOpen(false);
				setDashboard(null);
				if (!dashboard.id) {
					history.push({
						pathname: `/dashboard/${res.slug}`,
						state: {dashboard: res},
					});
				}
			});

	}; */
	const handleViewDashboard = (dashboard) => {
		history.push({
			pathname: `/dashboard/${dashboard.slug}`,
			state: { dashboard }
		});
	};
	const handleEditDashboard = (dashboard) => {
		setDashboard(dashboard);
		setIsDialogOpen(true);
	};
	const handleSaveDashboard = (dashboard) => {
		// TODO change to optimistic update
		saveDashboard(dashboard)
			.then((res) => {
				setIsDialogOpen(false);
				setDashboard(null);
				if (!dashboard.id) {
					return history.push({
						pathname: `/dashboard/${res.slug}`,
						state: { dashboard: res },
					});
				}
				resetDashboard();
			});
	};
	const handleDeleteDashboard = (dashboard) => {
		// TODO ask to confirm delete
		setDashboard(null);
		deleteDashboard(dashboard);
	};
	const dashboardActions = { handleViewDashboard, handleEditDashboard, handleSaveDashboard, handleDeleteDashboard };

	return (
		<>
			{
				isDialogOpen
				&&
				<ManageDashboardDialog
					dashboard={dashboard}
					open={isDialogOpen}
					handleSave={handleSaveDashboard}
					handleClose={() => setIsDialogOpen(false)}
				/>
			}
			{!total && <Alert severity='info'>Dashboards Not Found</Alert>}
			{active.length && <DashboardList dashboards={active} dashboardActions={dashboardActions} />}
			{archived.length && <>
				<Divider />
				<DashboardList dashboards={archived} dashboardActions={dashboardActions} />
			</>}
			<FloatingBtn color='primary' tooltipTitle='Add Dashboard' onClick={handleAddIconClick}>
				<AddIcon />
			</FloatingBtn>
		</>
	);
};

const mapStateToProps = state => ({
	dashboardsState: state.dashboards,
});
const mapDispatchToProps = dispatch => ({
	loadDashboards: () => dispatch(dashboardActions.loadDashboards()),
	saveDashboard: dashboard => dispatch(dashboardActions.saveDashboard(dashboard)),
	deleteDashboard: dashboard => dispatch(dashboardActions.deleteDashboard(dashboard)),
	resetDashboard: () => dispatch(dashboardActions.resetDashboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
