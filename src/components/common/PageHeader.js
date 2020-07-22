import React from 'react';
import Typography from '@material-ui/core/Typography';

const PageHeader = ({ children, color = 'primary' }) => {
	return (
		<Typography
			variant='h5'
			component='h2'
			gutterBottom
			color={color}
		>
			{children}
		</Typography>
	);
};

export default PageHeader;
