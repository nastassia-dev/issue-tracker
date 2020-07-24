import React from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import DraggableTask from './DraggableTask';
import EditableTitle from '../common/EditableTitle';
import * as dashboardsActions from '../../redux/actions/dashboardsActions';
import CreateTaskForm from './CreateTaskForm';

const useStyles = makeStyles(() => ({
	column: {
		height: 600,
		width: 300,
		padding: 10,
		backgroundColor: '#e3f1ff',
	},
}));

const DroppableColumn = ({ column, ownTasks: tasks, saveColumn, saveTask, ...props }) => {
	const classes = useStyles();
	const mockTasks = (column.id === 'GPd135E')
		? [
			{id: "ab", content: 'task 1'}, {id: "ac", content: 'task 2'}, {id: "ad", content: 'task 3'},
			{id: "ae", content: 'task 4'}, {id: "af", content: 'task 5'}, {id: "ag", content: 'task 6'},
		]
		: [];
	const isTitleValid = value => true;
	const onTitleSave = value => saveColumn({...column, title: value});

	return (
		<Paper className={classes.column}>
			<EditableTitle
				title={column.title}
				isTitleValid={isTitleValid}
				onTitleSave={onTitleSave}
			/>
			<Droppable
				droppableId={column.id}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{(tasks || []).map((task, index) => (
							<DraggableTask key={task.id} task={task} index={index} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<CreateTaskForm saveTask={saveTask} column={column} />
		</Paper>
	)

};

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => ({
	saveColumn: (column) => dispatch(dashboardsActions.saveColumn(column)),
	saveTask: (column, task) => dispatch(dashboardsActions.saveTask(column, task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DroppableColumn);
