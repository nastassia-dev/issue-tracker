import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ManageTaskDialog from './ManageTaskDialog';

const useStyles = makeStyles(() => ({
	task: {
		position: 'relative',
		height: 'auto',
		padding: 10,
		border: '1px solid rgba(0, 0, 0, 0.12)',
		marginBottom: 5,
		borderRadius: 3,
		backgroundColor: '#fafafa',
	},
}));

const Task = ({ task, innerRef, saveTask, ...props}) => {
	const classes = useStyles();
	const [showEdit, setShowEdit] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const handleEditClicked = () => {
		setShowEdit(false);
		setIsOpen(true);
	};

	return (
		<div
			onMouseEnter={() => setShowEdit(true)}
			onMouseLeave={() => setShowEdit(false)}
			className={classes.task}
			ref={innerRef}
			{...props}
		>
			{
				isOpen &&
				<ManageTaskDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					saveTask={saveTask}
					task={task}
				/>
			}
			<div>{task.content}</div>
			{
				showEdit &&
				<IconButton
					style={{position: 'absolute', right: 8, top: 8}}
					size='small'
					onClick={handleEditClicked}
				>
					<EditIcon fontSize='small'/>
				</IconButton>
			}
		</div>
	);
};

const DraggableTask = ({ task, index, saveTask }) => {
	return (
		<Draggable
			draggableId={task.id}
			index={index}
		>
			{(provided, snapshot) => (
				<Task
					innerRef={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					saveTask={saveTask}
					task={task}
				/>
			)}
		</Draggable>
	)
};

export default DraggableTask;
