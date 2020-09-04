import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Title from '../common/Title';
import TasksPage from '../tasks/TasksPage';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));

export default function Main () {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					<Title>Section 1</Title>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4} lg={3}>
				<Paper className={fixedHeightPaper}>
					<Title>Section 2</Title>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<TasksPage />
				</Paper>
			</Grid>
		</Grid>
	);
}
