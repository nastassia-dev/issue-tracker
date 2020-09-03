import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const fieldProps = {
	fullWidth: true,
	margin: 'normal',
	variant: 'outlined',
	required: true,
	InputLabelProps: { shrink: true },
};
const defaultDashboard = {
	title: '',
	description: '',
};

const ManageDashboardDialog = ({ dashboard: dashboardProp, open, handleSave, handleClose }) => {
	const [dashboard, setDashboard] = useState((dashboardProp || defaultDashboard));
	const [errors, setErrors] = useState({});
	useEffect(() => {
		setDashboard((dashboardProp || defaultDashboard));
	}, [dashboardProp]);

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
		}));
	};
	const isFormValid = () => {
		const { title, description } = dashboard;
		const err = {};
		if (!title) err.title = true;
		if (!description) err.description = true;
		setErrors(err);
		return Object.keys(err).length === 0;
	};
	const handleSaveConfirm = () => {
		if (!isFormValid()) return;
		handleSave(dashboard);
	};

	return (
		<Dialog fullWidth open={open} onClose={handleClose}>
			<DialogTitle style={{ paddingBottom: 0 }}>
				Add Dashboard
			</DialogTitle>
			<DialogContent>
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
					multiline
					rows={3}
					rowsMax={6}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleClose}>
					Cancel
				</Button>
				<Button color='primary' onClick={handleSaveConfirm}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ManageDashboardDialog;
