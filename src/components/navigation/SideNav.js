import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
}));

const SideNav = ({ open, handleDrawerClose }) => {
	const classes = useStyles();

	return (
		<Drawer
			variant='permanent'
			classes={{
				paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
			}}
			open={open}
		>
			<div className={classes.toolbarIcon}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				<ListItem button component={RouterLink} to='/'>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary='Main' />
				</ListItem>
				<ListItem button component={RouterLink} to='/dashboards'>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary='Dashboards' />
				</ListItem>
			</List>
		</Drawer>
	);
};

SideNav.propTypes = {
	open: PropTypes.bool.isRequired,
	handleDrawerClose: PropTypes.func.isRequired,
};

export default SideNav;
