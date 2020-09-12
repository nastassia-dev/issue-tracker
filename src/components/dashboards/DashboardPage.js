import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import * as dashboardsActions from '../../redux/actions/dashboardsActions';
import DashboardDragDropContainer from './DashboardDragDropContainer';
import FloatingBtn from '../common/FloatingBtn';
import ManageColumnDialog from './ManageColumnDialog';
import { DashboardShape } from '../../prop-type-shapes';

const DashboardPage = ({
	location,
	dashboardState,
	loadDashboard,
	saveColumnBulk,
	saveColumn,
	resetDashboard,
}) => {
	// const dashboardTemp = (location.state && location.state.dashboard) || {};
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const slug = location.pathname.split('/').reverse()[0];
	const { dashboard, loadError } = dashboardState;

	useEffect(() => {
		// TODO avoid extra calls if dashboard data is available
		loadDashboard(slug);
		return resetDashboard;
	}, [slug]);

	const handleAddIconClick = () => setIsDialogOpen(true);
	const handleBulkColumnSave = columns => saveColumnBulk(columns);
	const handleColumnSave = (column) => {
		setIsDialogOpen(false);
		saveColumn({ ...column, dashboardId: dashboard.id });
	};

	if (loadError) {
		return <Redirect to='/dashboards' />;
	}

	return (
		<>
			{dashboard.id && (
				<>
					{isDialogOpen && (
						<ManageColumnDialog
							open={isDialogOpen}
							handleSave={handleColumnSave}
							handleClose={() => setIsDialogOpen(false)}
						/>
					)}
					<DashboardDragDropContainer
						dashboard={dashboard}
						handleColumnSave={handleBulkColumnSave}
					/>
					<FloatingBtn color='primary' tooltipTitle='Add Column' onClick={handleAddIconClick}>
						<AddIcon />
					</FloatingBtn>
				</>
			)}
		</>
	);
};

DashboardPage.propTypes = {
	location: PropTypes.objectOf(PropTypes.object).isRequired,
	dashboardState: PropTypes.shape({
		dashboard: DashboardShape.isRequired,
		loadError: PropTypes.bool.isRequired,
	}).isRequired,
	loadDashboard: PropTypes.func.isRequired,
	saveColumnBulk: PropTypes.func.isRequired,
	saveColumn: PropTypes.func.isRequired,
	resetDashboard: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	dashboardState: state.dashboard,
});
const mapDispatchToProps = dispatch => ({
		loadDashboard: id => dispatch(dashboardsActions.loadDashboard(id)),
		resetDashboard: () => dispatch(dashboardsActions.resetDashboard()),
		saveColumnBulk: columns => dispatch(dashboardsActions.saveColumnBulk(columns)),
		saveColumn: column => dispatch(dashboardsActions.saveColumn(column)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
