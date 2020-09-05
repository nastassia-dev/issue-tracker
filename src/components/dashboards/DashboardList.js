import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import DashboardCard from './DashboardCard';

const DashboardList = ({ dashboards, dashboardActions, header = '' }) => (
	<>
		<Typography variant='h5' component='h2' gutterBottom>
			{header}
		</Typography>
		{dashboards.map(dashboard => (
			<span key={dashboard.id}>
				<DashboardCard dashboard={dashboard} actions={dashboardActions} />
			</span>
		))}
	</>
);

DashboardList.propTypes = {
	dashboards: PropTypes.objectOf(PropTypes.object).isRequired,
	dashboardActions: PropTypes.objectOf(PropTypes.object).isRequired,
	header: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DashboardList;
