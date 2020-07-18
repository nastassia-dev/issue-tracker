import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import DashboardCard from './DashboardCard';
import FloatingBtn from '../common/FloatingBtn';

const DashboardList = ({ dashboards }) => {
	return (
		<>
			{dashboards.map(dashboard => {
					return <span key={dashboard.id}>
						<DashboardCard dashboard={dashboard}/>
					</span>
				})
			}
			<FloatingBtn color='primary' tooltipTitle='Create New Dashboard'>
				<AddIcon />
			</FloatingBtn>
		</>
	)
};

export default DashboardList;
