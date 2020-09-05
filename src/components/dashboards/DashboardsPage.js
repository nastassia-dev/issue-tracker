import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
	deleteDashboard,
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
	const handleViewDashboard = (d) => {
		history.push({
			pathname: `/dashboard/${d.slug}`,
			state: { dashboard: d },
		});
	};
	const handleEditDashboard = (d) => {
		setDashboard(d);
		setIsDialogOpen(true);
	};
	const handleSaveDashboard = (d) => {
		// TODO change to optimistic update
		saveDashboard(d)
			.then((res) => {
				setIsDialogOpen(false);
				setDashboard(null);
				if (!d.id) {
					return history.push({
						pathname: `/dashboard/${res.slug}`,
						state: { dashboard: res },
					});
				}
				return resetDashboard();
			});
	};
	const handleDeleteDashboard = (d) => {
		// TODO ask to confirm delete
		setDashboard(null);
		deleteDashboard(d);
	};
	const allActions = { handleViewDashboard, handleEditDashboard, handleSaveDashboard, handleDeleteDashboard };

	return (
		<>
			{isDialogOpen && (
				<ManageDashboardDialog
					dashboard={dashboard}
					open={isDialogOpen}
					handleSave={handleSaveDashboard}
					handleClose={() => setIsDialogOpen(false)}
				/>
				)}
			{!total && <Alert severity='info'>Dashboards Not Found</Alert>}
			{active.length && <DashboardList dashboards={active} dashboardActions={allActions} />}
			{archived.length && (
				<>
					<Divider />
					<DashboardList dashboards={archived} dashboardActions={allActions} />
				</>
			)}
			<FloatingBtn color='primary' tooltipTitle='Add Dashboard' onClick={handleAddIconClick}>
				<AddIcon />
			</FloatingBtn>
		</>
	);
};

DashboardsPage.propTypes = {
	history: PropTypes.objectOf(PropTypes.object()).isRequired,
	dashboardsState: PropTypes.shape({
		active: PropTypes.objectOf(PropTypes.object()).isRequired,
		archived: PropTypes.objectOf(PropTypes.object()).isRequired,
		total: PropTypes.number.isRequired,
	}).isRequired,
	loadDashboards: PropTypes.func.isRequired,
	saveDashboard: PropTypes.func.isRequired,
	resetDashboard: PropTypes.func.isRequired,
	deleteDashboard: PropTypes.func.isRequired,
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
