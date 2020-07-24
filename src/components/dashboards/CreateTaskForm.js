import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const CreateTaskForm = ({ saveTask, column }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState('');
	const [hasError, setHasError] = useState(false);
	const handleAddTask = () => {
		if (!content) return setHasError(true);
		setIsEditing(false);
		saveTask(column, { content });
	};
	const handleClose = () => {setIsEditing(false)};
	const handleContentChange = ({ target: { value } }) => {
		setHasError(false);
		setContent(value);
	};
	return (
		isEditing
			?
				<Dialog
					fullWidth
					open={isEditing}
					onClose={handleClose}
				>
					<DialogTitle style={{paddingBottom:0}}>Add Task</DialogTitle>
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
							rows={4}
							rowsMax={6}
							onChange={handleContentChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button color='primary' onClick={handleClose}>
							Cancel
						</Button>
						<Button color='primary' onClick={handleAddTask}>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			:
			<Tooltip title='Add New Task'>
				<IconButton
					style={{float: 'right', cursor: 'pointer'}}
					size='small'
					onClick={() => setIsEditing(true)}
				>
					<AddIcon fontSize='large'/>
				</IconButton>
			</Tooltip>
	);
};

export default CreateTaskForm;
