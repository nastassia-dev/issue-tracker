import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextInputField from '../common/TextInputField';

const ManageTaskDialog = ({ task = {}, isOpen, setIsOpen, saveTask, deleteTask }) => {
	const [content, setContent] = useState(task.content);
	const [hasError, setHasError] = useState(false);

	const handleSaveTask = () => {
		if (!content) return setHasError(true);
		setIsOpen(false);
		if (task.content === content) return null;
		saveTask({ ...task, content });
		return null;
	};
	const handleClose = () => setIsOpen(false);
	const handleDelete = () => deleteTask(task.id);
	const handleContentChange = ({ target: { value } }) => {
		setHasError(false);
		setContent(value);
	};

	return (
		<Dialog
			fullWidth
			open={isOpen}
			onClose={handleClose}
		>
			<DialogTitle style={{ paddingBottom: 0 }}>
				{task.content ? 'Edit Task' : 'Add Task'}
			</DialogTitle>
			<DialogContent>
				<TextInputField
					autoFocus
					error={hasError}
					label='Description'
					rows={3}
					rowsMax={6}
					onChange={handleContentChange}
					value={content}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleClose}>
					Cancel
				</Button>
				{
					task.content && (
          <Button color='primary' onClick={handleDelete}>
						Delete
          </Button>
        )}
				<Button color='primary' onClick={handleSaveTask}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

ManageTaskDialog.defaultProps = {
	task: {},
};

ManageTaskDialog.propTypes = {
	task: PropTypes.objectOf(PropTypes.object),
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	saveTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
};

export default ManageTaskDialog;
