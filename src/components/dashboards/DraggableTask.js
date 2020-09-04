import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ManageTaskDialog from './ManageTaskDialog';

const useStyles = makeStyles(() => ({
	task: isDragging => ({
		position: 'relative',
		height: 'auto',
		padding: 10,
		border: '1px solid rgba(0, 0, 0, 0.12)',
		marginBottom: 5,
		borderRadius: 3,
		backgroundColor: isDragging ? 'red' : '#fafafa',
	}),
}));

const Task = ({ task, isDragging, innerRef, saveTask, deleteTask, ...props }) => {
	const classes = useStyles(isDragging);
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
				isOpen && (
        <ManageTaskDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					saveTask={saveTask}
					deleteTask={deleteTask}
					task={task}
        />
  )}
			<div>{task.content}</div>
			{
				showEdit && (
        <IconButton
					style={{ position: 'absolute', right: 8, top: 8 }}
					size='small'
					onClick={handleEditClicked}
        >
					<EditIcon fontSize='small' />
        </IconButton>
  )}
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.objectOf(PropTypes.object()).isRequired,
	isDragging: PropTypes.bool.isRequired,
	innerRef: PropTypes.objectOf(PropTypes.object()).isRequired,
	saveTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
};

const DraggableTask = ({ task, index, saveTask, deleteTask }) => (
		<Draggable
			draggableId={task.id}
			index={index}
		>
			{(provided, snapshot) => (
				<Task
					innerRef={provided.innerRef}
					isDragging={snapshot.isDragging}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					saveTask={saveTask}
					deleteTask={deleteTask}
					task={task}
				/>
			)}
		</Draggable>
	);

DraggableTask.propTypes = {
  task: PropTypes.objectOf(PropTypes.object()).isRequired,
	index: PropTypes.number.isRequired,
  saveTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default DraggableTask;
