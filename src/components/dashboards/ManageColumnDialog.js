import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import TextInputField from '../common/TextInputField';
import DialogActionsContainer from '../dialog/DialogActionsContainer';
import DialogContainer from '../dialog/DialogContainer';
import { AT_LIMIT_DIALOG_MSG__COLUMN } from '../../constants';
import AtLimitDialog from '../dialog/AtLimitDialog';

const defaultColumn = { title: '' };

const ManageColumnDialog = ({ open, atLimit, handleSave, handleClose }) => {
	const [column, setColumn] = useState(defaultColumn);
	const [error, setError] = useState(false);

	const handleChange = ({ target: { name, value } }) => {
		setError(false);
		setColumn(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSaveConfirm = () => {
		const { title } = column;
		if (!title) return setError(true);
		return handleSave(column);
	};

	if (atLimit) {
		return (
			<AtLimitDialog
				open={open}
				message={AT_LIMIT_DIALOG_MSG__COLUMN}
				handleClose={handleClose}
			/>
		);
	}

	return (
		<DialogContainer open={open} onClose={handleClose} title='Add Column'>
			<DialogContent>
				<TextInputField
					autoFocus
					name='title'
					label='Title'
					error={error}
					value={column.title}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActionsContainer handleClose={handleClose} handleConfirm={handleSaveConfirm} />
		</DialogContainer>
	);
};

ManageColumnDialog.defaultProps = {
	atLimit: true,
};
ManageColumnDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	atLimit: PropTypes.bool,
	handleSave: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default ManageColumnDialog;
