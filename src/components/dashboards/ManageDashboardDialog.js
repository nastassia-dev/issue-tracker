import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DashboardShape } from '../../prop-type-shapes';
import TextInputField from '../common/TextInputField';

const defaultDashboard = {
	title: '',
	description: '',
};

const ManageDashboardDialog = ({ dashboard: dashboardProp, open, handleSave, handleClose }) => {
	const [dashboard, setDashboard] = useState((dashboardProp || defaultDashboard));
	const [errors, setErrors] = useState({});

	const handleChange = ({ target: { name, value } }) => {
		setDashboard(prevState => ({ ...prevState, [name]: value }));
	};
	const handleFocus = ({ target: { name } }) => {
		setErrors(prevState => ({ ...prevState, [name]: false }));
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
				<TextInputField
					autoFocus
					name='title'
					label='Title'
					error={errors.title}
					value={dashboard.title}
					onChange={handleChange}
					onFocus={handleFocus}
				/>
				<TextInputField
					name='description'
					label='Description'
					error={errors.description}
					value={dashboard.description}
					onChange={handleChange}
					onFocus={handleFocus}
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

ManageDashboardDialog.defaultProps = {
	dashboard: defaultDashboard,
};
ManageDashboardDialog.propTypes = {
	dashboard: DashboardShape,
	open: PropTypes.bool.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default ManageDashboardDialog;
