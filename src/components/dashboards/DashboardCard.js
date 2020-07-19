import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MoreVertMenu from '../common/MoreVertMenu';

const VIEW = 'View';
const ARCHIVE = 'Archive';
const DELETE = 'Delete';
const actionOpts = [VIEW, ARCHIVE, DELETE];
const useStyles = makeStyles({
	root: {
		position: 'relative',
		minWidth: 350,
		minHeight: 200,
		display: 'inline-block',
		marginRight: 25,
		marginBottom: 25,
		border: '1px solid #76C077',
	},
	meta: {
		position: 'absolute',
		bottom: 10,
		right: 15,
		font: 10,
		color: '#0000006b',
	},
	btn: {
		fontWeight: 600,
	},
});

const DashboardCard = ({ dashboard, actions }) => {
	const classes = useStyles();

	const handleAction = name => {
		if (name === VIEW) return actions.handleViewDashboard(dashboard);
		if (name === ARCHIVE) return actions.handleArchiveDashboard(dashboard);
		if (name === DELETE) return actions.handleDeleteDashboard(dashboard);
	};
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant='h5' component='h2' gutterBottom>
					{dashboard.title}
				</Typography>
				<MoreVertMenu options={actionOpts} handleAction={handleAction}/>
				<Typography color='textSecondary'>
					{dashboard.description}
				</Typography>
				<Typography color='textSecondary'>
					{dashboard.status}
				</Typography>
				<Typography className={classes.meta} color='textSecondary' variant='body2' component='p'>
					{`Last Updated: ${dashboard.updatedAt || dashboard.createdAt}`}
				</Typography>
			</CardContent>
		</Card>
	)
};

export default DashboardCard;
