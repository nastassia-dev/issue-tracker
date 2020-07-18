import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		minWidth: 350,
		minHeight: 200,
		display: 'inline-block',
		marginRight: 25,
		marginBottom: 25,
		border: '1px solid #76C077',
	},
	meta: {
		float: 'right',
	},
	btn: {
		fontWeight: 600,
	}
});

const DashboardCard = ({ dashboard }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant='h5' component='h2' gutterBottom>
					{dashboard.title}
				</Typography>
				<Typography color='textSecondary'>
					{dashboard.description}
				</Typography>
				<Typography color='textSecondary'>
					{dashboard.status}
				</Typography>
				<Typography className={classes.meta} color='textSecondary' variant='body2' component='p'>
					{`Last Updated: ${dashboard.lastUpdated}`}
				</Typography>
			</CardContent>
			<CardActions>
				<Button className={classes.btn} size='small' color='primary'>View Dashboard</Button>
			</CardActions>
		</Card>
	)
};

export default DashboardCard;
