import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 30;
const useStyles = makeStyles({
	root: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
});

const MoreVertMenu = ({ options, handleAction }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();
	const open = Boolean(anchorEl);

	const handleOpen = e => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleClick = ({ currentTarget: { dataset: { actionName } } }) => {
		setAnchorEl(null);
		handleAction(actionName);
	};

	return (
		<div className={classes.root}>
			<IconButton onClick={handleOpen}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}
			>
				{options.map((option) => (
					<MenuItem
						data-action-name={option}
						key={option}
						onClick={handleClick}
					>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
};

export default MoreVertMenu;
