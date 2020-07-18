import React from 'react';
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
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));


const AppContainer = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Navigation />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					{props.children}
				</Container>
			</main>
		</div>
	);
};

export default AppContainer;
