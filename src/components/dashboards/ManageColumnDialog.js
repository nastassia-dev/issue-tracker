import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextInputField from '../common/TextInputField';
import DialogActionsContainer from '../dialog/DialogActionsContainer';
import DialogContainer from '../dialog/DialogContainer';

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
			<DialogContainer open={open} title='Demo Version: Limit Reached'>
				<DialogContent>
					<Typography gutterBottom>
						You are viewing a demo version of the app. A maximum of 6 columns per dashboard is allowed.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button color='primary' onClick={handleClose}>
						Close
					</Button>
				</DialogActions>
			</DialogContainer>
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
