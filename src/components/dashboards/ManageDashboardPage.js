import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as dashboardsActions from '../../redux/actions/dashboardsActions';

const fieldProps = {
	fullWidth: true,
	margin: 'normal',
	variant: 'outlined',
	required: true,
	InputLabelProps: {shrink: true},
};
const defaultDashboard = {
	title: '',
	description: '',
};

const ManageDashboardPage = ({ history, saveDashboard }) => {
	const [dashboard, setDashboard] = useState(defaultDashboard);
	const [errors, setErrors] = useState({});

	const handleChange = ({ target: { name, value } }) => {
		setDashboard(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleFocus = ({ target: { name } }) => {
		setErrors(prevState => ({
			...prevState,
			[name]: false,
		}))
	};
	const isFormValid = () => {
		const { title, description } = dashboard;
		const errors = {};
		if (!title) errors.title = true;
		if (!description) errors.description = true;
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (!isFormValid()) return;
		saveDashboard(dashboard)
			.then(res => {
				history.push({
					pathname: `/dashboard/${res.slug}`,
					state: { dashboard: res },
				});
			});
	};

	return (
		<form onSubmit={handleSubmit} autoComplete='off' style={{maxWidth:900}}>
			<Typography variant='h5' component='h2' gutterBottom>
				Create Dashboard
			</Typography>
			<TextField
				name='title'
				label='Title'
				error={errors.title}
				value={dashboard.title}
				onChange={handleChange}
				onFocus={handleFocus}
				{...fieldProps}
				autoFocus
			/>
			<TextField
				name='description'
				label='Description'
				error={errors.description}
				value={dashboard.description}
				onChange={handleChange}
				{...fieldProps}
			/>
			<Button
				style={{float:'right',marginTop:15}}
				size='large'
				color='primary'
				variant='contained'
				onClick={handleSubmit}
			>
				Save
			</Button>
		</form>
	)
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
	return {
		saveDashboard: (dashboard) => dispatch(dashboardsActions.saveDashboard(dashboard)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDashboardPage);
