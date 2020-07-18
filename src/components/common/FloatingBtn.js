import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
	btnAdd: {
		position: 'absolute',
		bottom: 40,
		right: 60,
	},
}));

const FloatingBtn = ({ color, tooltipTitle, children, onClick }) => {
	const classes = useStyles();

	return (
		<Tooltip title={tooltipTitle}>
			<Fab color={color} className={classes.btnAdd} onClick={onClick}>
				{children}
			</Fab>
		</Tooltip>
	)
};

export default FloatingBtn;
