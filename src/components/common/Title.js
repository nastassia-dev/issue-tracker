import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Title = ({ children, ...props }) => (
	<Typography
		component='p'
		gutterBottom
		{...props}
	>
		{children}
	</Typography>
);

Title.propTypes = {
	children: PropTypes.string.isRequired,
};

export default Title;
