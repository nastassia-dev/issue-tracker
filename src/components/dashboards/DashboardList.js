import React from 'react';
import Typography from '@material-ui/core/Typography';

import DashboardCard from './DashboardCard';

const DashboardList = ({ dashboards, dashboardActions, header = '' }) => {
	return (
		<>
			<Typography variant='h5' component='h2' gutterBottom>
				{header}
			</Typography>
			{dashboards.map(dashboard => {
					return <span key={dashboard.id}>
						<DashboardCard dashboard={dashboard} actions={dashboardActions} />
					</span>
				})
			}
		</>
	)
};

export default DashboardList;
