import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import DraggableTask from './DraggableTask';
import EditableTitle from '../common/EditableTitle';

const useStyles = makeStyles(() => ({
	column: {
		height: 600,
		width: 300,
		padding: 10,
		backgroundColor: '#e3f1ff',
	},
}));

const DroppableColumn = ({ column, tasks: realTasks }) => {
	const classes = useStyles();
	const mockTasks = (column.id === 'GPd135E')
		? [
			{id: "ab", content: 'task 1'}, {id: "ac", content: 'task 2'}, {id: "ad", content: 'task 3'},
			{id: "ae", content: 'task 4'}, {id: "af", content: 'task 5'}, {id: "ag", content: 'task 6'},
		]
		: [];
	return (
		<Paper className={classes.column}>
			<EditableTitle title={column.title}/>
			<Droppable
				droppableId={column.id}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{mockTasks.map((task, index) => (
							<DraggableTask key={task.id} task={task} index={index}/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Paper>
	)

};

export default DroppableColumn;
