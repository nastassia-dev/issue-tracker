import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	task: {
		height: 40,
		padding: 10,
		border: '1px solid rgba(0, 0, 0, 0.12)',
		marginBottom: 5,
		borderRadius: 3,
		backgroundColor: '#fafafa',
	},
}));

const Task = ({ children, innerRef, ...props}) => {
	const classes = useStyles();

	return (
		<div className={classes.task} ref={innerRef} {...props}>
			{children}
		</div>
	);
};

const DraggableTask = ({ task, index }) => {
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
				>
					{task.content}
				</Task>
			)}
		</Draggable>
	)

};

export default DraggableTask;
