import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

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
				<TextField
					autoFocus
					required
					error={hasError}
					variant='outlined'
					label='Description'
					type='text'
					margin='normal'
					fullWidth
					multiline
					rows={3}
					rowsMax={6}
					onChange={handleContentChange}
					InputLabelProps={{ shrink: true }}
					value={content}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleClose}>
					Cancel
				</Button>
				{
					deleteTask && (
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

export default ManageTaskDialog;
