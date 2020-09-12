import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import DraggableTask from './DraggableTask';
import EditableTitle from '../common/EditableTitle';
import * as dashboardsActions from '../../redux/actions/dashboardsActions';
import ManageTaskContainer from './ManageTaskContainer';
import MoreVertMenu from '../common/MoreVertMenu';
import { ColumnShape, DashboardShape, TaskShape } from '../../prop-type-shapes';

const useStyles = makeStyles(() => ({
	column: {
		height: 600,
		width: 300,
		padding: '10px 5px',
		backgroundColor: '#e3f1ff',
		position: 'relative',
	},
}));
const EDIT = 'Edit';
const DELETE = 'Delete';
const actionOpts = [EDIT, DELETE];
const menuStyles = { root: { top: 9, right: 5 }, menuItem: { fontSize: 14 }, iconSize: 'small' };

const DroppableColumn = ({ column, ownTasks: tasks, dashboard, saveColumn, saveTask, deleteTask, deleteColumn }) => {
	const [showTitleEdit, setShowTitleEdit] = useState(false);
	const classes = useStyles();
	const isTitleValid = value => true;
	const onTitleSave = (value) => {
		setShowTitleEdit(false);
		saveColumn({ ...column, title: value });
	};
	const handleTaskSave = task => saveTask(column, task);
	const handleTaskDelete = id => deleteTask(column, id);
	const handleAction = (name) => {
		if (name === EDIT) return setShowTitleEdit(true);
		// TODO ask to confirm delete
		if (name === DELETE) return deleteColumn(dashboard, column.id);
		return null;
	};
	return (
		<Paper className={classes.column}>
			<EditableTitle
				title={column.title}
				isEditing={showTitleEdit}
				isTitleValid={isTitleValid}
				onTitleEdit={() => setShowTitleEdit(true)}
				onTitleSave={onTitleSave}
				onEditCancel={() => setShowTitleEdit(false)}
			/>
			{!showTitleEdit	&&
				<MoreVertMenu options={actionOpts} styles={menuStyles} handleAction={handleAction} />
			}
			<Droppable
				droppableId={column.id}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						style={{
							backgroundColor: (snapshot.isDraggingOver ? 'grey' : 'yellow'),
							transition: 'background-color 0.2s ease',
						}}
					>
						{(tasks || []).map((task, index) => (
							<DraggableTask
								key={task.id}
								task={task}
								index={index}
								saveTask={handleTaskSave}
								deleteTask={handleTaskDelete}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<ManageTaskContainer saveTask={handleTaskSave} deleteTask={handleTaskDelete} />
		</Paper>
	);
};

DroppableColumn.defaultProps = {
	ownTasks: [],
};
DroppableColumn.propTypes = {
	column: ColumnShape.isRequired,
	ownTasks: PropTypes.arrayOf(TaskShape),
	dashboard: DashboardShape.isRequired,
	saveColumn: PropTypes.func.isRequired,
	saveTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
	deleteColumn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	dashboard: state.dashboard.dashboard,
});
const mapDispatchToProps = dispatch => ({
	saveColumn: column => dispatch(dashboardsActions.saveColumn(column)),
	deleteColumn: (dashboard, columnId) => dispatch(dashboardsActions.deleteColumn(dashboard, columnId)),
	saveTask: (column, task) => dispatch(dashboardsActions.saveTask(column, task)),
	deleteTask: (column, id) => dispatch(dashboardsActions.deleteTask(column, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DroppableColumn);
