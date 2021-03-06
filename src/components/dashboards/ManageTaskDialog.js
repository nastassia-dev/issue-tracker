import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import TextInputField from '../common/TextInputField';
import DialogActionsContainer from '../dialog/DialogActionsContainer';
import DialogContainer from '../dialog/DialogContainer';
import AtLimitDialog from '../dialog/AtLimitDialog';
import { AT_LIMIT_DIALOG_MSG__TASK } from '../../constants';

const ManageTaskDialog = ({ task = {}, atLimit, isOpen, setIsOpen, saveTask, deleteTask }) => {
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

	if (atLimit && !task.content) {
		return (
			<AtLimitDialog
				open={isOpen}
				message={AT_LIMIT_DIALOG_MSG__TASK}
				handleClose={handleClose}
			/>
		);
	}

	return (
		<DialogContainer open={isOpen} onClose={handleClose} title={task.content ? 'Edit Task' : 'Add Task'}>
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
			<DialogActionsContainer handleClose={handleClose} handleConfirm={handleSaveTask}>
				{
					task.content && (
						<Button color='primary' onClick={handleDelete}>
							Delete
						</Button>
					)}
			</DialogActionsContainer>
		</DialogContainer>
	);
};

ManageTaskDialog.defaultProps = {
	task: {},
	atLimit: true,
};

ManageTaskDialog.propTypes = {
	task: PropTypes.objectOf(PropTypes.object),
	atLimit: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	saveTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
};

export default ManageTaskDialog;
