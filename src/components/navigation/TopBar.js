import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GitHub from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { DashboardShape } from '../../prop-type-shapes';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
	toolbar: {
		paddingRight: 24,
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
}));

const TopBar = ({ open, handleDrawerOpen, dashboard }) => {
	const classes = useStyles();
	// TODO Fix do not change title if on main page
	return (
			<AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
						{dashboard.title || 'My Workspace'}
					</Typography>
					<IconButton color='inherit'>
						<Badge badgeContent={2} max={10} color='secondary'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton
						color='inherit'
					>
						<GitHub />
					</IconButton>
					<IconButton
						color='inherit'
					>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
	);
};

TopBar.propTypes = {
	open: PropTypes.bool.isRequired,
	handleDrawerOpen: PropTypes.func.isRequired,
	dashboard: DashboardShape.isRequired,
};

const mapStateToProps = state => ({
	dashboard: state.dashboard.dashboard,
});

export default connect(mapStateToProps)(TopBar);
