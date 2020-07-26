import React, { useState } from 'react';
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
	InputLabelProps: {shrink: true},
};
const defaultColumn = { title: '' };

const ManageColumnDialog = ({ open, handleSave, handleClose }) => {
	const [column, setColumn] = useState(defaultColumn);
	const [errors, setErrors] = useState({});

	const handleChange = ({ target: { name, value } }) => {
		setColumn(prevState => ({
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
		const { title } = column;
		const errors = {};
		if (!title) errors.title = true;
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleSaveConfirm = () => {
		if (!isFormValid()) return;
		handleSave(column);
	};

	return (
		<Dialog fullWidth open={open} onClose={handleClose}>
			<DialogTitle style={{paddingBottom: 0}}>
				Add Column
			</DialogTitle>
			<DialogContent>
				<TextField
					autoComplete='off'
					name='title'
					label='Title'
					error={errors.title}
					value={column.title}
					onChange={handleChange}
					onFocus={handleFocus}
					{...fieldProps}
					autoFocus
				/>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleClose}>
					Cancel
				</Button>
				<Button color='primary' onClick={handleSaveConfirm} >
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
};

export default ManageColumnDialog;
