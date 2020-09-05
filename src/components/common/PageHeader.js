import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const PageHeader = ({ children, color }) => (
	<Typography
		variant='h5'
		component='h2'
		gutterBottom
		color={color}
	>
		{children}
	</Typography>
);

PageHeader.defaultProps = {
	color: 'primary',
};
PageHeader.propTypes = {
	children: PropTypes.objectOf(PropTypes.object).isRequired,
	color: PropTypes.string,
};

export default PageHeader;
