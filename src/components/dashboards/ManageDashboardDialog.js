import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import { DashboardShape } from '../../prop-type-shapes';
import TextInputField from '../common/TextInputField';
import DialogActionsContainer from '../dialog/DialogActionsContainer';
import DialogContainer from '../dialog/DialogContainer';

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
		<DialogContainer open={open} onClose={handleClose} title='Add Dashboard'>
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
			<DialogActionsContainer handleClose={handleClose} handleConfirm={handleSaveConfirm} />
		</DialogContainer>
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
