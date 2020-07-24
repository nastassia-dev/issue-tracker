import React from 'react';
import Typography from '@material-ui/core/Typography';

const Title = ({ children, ...props }) => {
	return (
		<Typography
			component='p'
			gutterBottom
			{...props}
		>
			{children}
		</Typography>
	);
};

export default Title;
