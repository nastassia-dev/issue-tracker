import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from '../navigation/Navigation';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		margin: 0,
	},
}));

const AppContainer = (props) => {
	const classes = useStyles();
	const { children } = props;
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Navigation />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					{children}
				</Container>
			</main>
		</div>
	);
};

AppContainer.propTypes = {
	children: PropTypes.objectOf(PropTypes.object()).isRequired
};

export default AppContainer;
