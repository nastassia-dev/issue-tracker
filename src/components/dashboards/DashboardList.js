import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import DashboardCard from './DashboardCard';

const DashboardList = ({ dashboards, dashboardActions, header }) => (
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

DashboardList.defaultProps = {
	header: '',
};
DashboardList.propTypes = {
	dashboards: PropTypes.arrayOf(PropTypes.object).isRequired,
	dashboardActions: PropTypes.objectOf(PropTypes.func).isRequired,
	header: PropTypes.string,
};

export default DashboardList;
