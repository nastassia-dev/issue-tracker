import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const TaskDialog = ({ task = {}, isOpen, setIsOpen, saveTask }) => {
	const [content, setContent] = useState(task.content);
	const [hasError, setHasError] = useState(false);

	const handleSaveTask = () => {
		if (!content) return setHasError(true);
		setIsOpen(false);
		if (task.content === content) return;
		saveTask({ ...task, content });
	};
	const handleClose = () => {setIsOpen(false)};
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
			<DialogTitle style={{paddingBottom: 0}}>
				{task.content ? 'Edit Task': 'Add Task'}
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					required
					error={hasError}
					margin='dense'
					label='Description'
					type='text'
					fullWidth
					multiline
					rows={1}
					rowsMax={6}
					onChange={handleContentChange}
					value={content}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleClose}>
					Cancel
				</Button>
				<Button color='primary' onClick={handleSaveTask}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskDialog;
