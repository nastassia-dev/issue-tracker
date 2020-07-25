import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';

import DroppableColumn from './DroppableColumn';

const DashboardDragDropContainer = ({ dashboard, handleColumnSave }) => {
	const { columns, tasks, columnOrder } = dashboard;

	const onDragStart = () => {};
	const onDragUpdate = () => {};
	const onDragEnd = result => {
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const startColumn = columns.find(c => c.id === source.droppableId);
		const finishColumn = columns.find(c => c.id === destination.droppableId);

		if (startColumn === finishColumn) {
			const taskIds = [...startColumn.taskIds];
			taskIds.splice(source.index, 1);
			taskIds.splice(destination.index, 0, draggableId);
			const column = { ...startColumn, taskIds };
			handleColumnSave([column]);
			return;
		}
		const sourceTaskIds = [...startColumn.taskIds];
		const destinationTaskIds = [...finishColumn.taskIds];
		sourceTaskIds.splice(source.index, 1);
		destinationTaskIds.splice(destination.index, 0, draggableId);

		handleColumnSave([
			{ ...startColumn, taskIds: sourceTaskIds },
			{ ...finishColumn, taskIds: destinationTaskIds },
			]);
	};

	return (
		<DragDropContext
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onDragEnd={onDragEnd}
		>
			<Grid container justify='flex-start' spacing={1}>
				{columnOrder.map((columnId, index) => {
					/*const column = all.columns.find(c => c.id === columnId);
					const ownTasks = column.taskIds.map(t => all.tasks.find(tt => tt.id === t));*/
					const column = columns.find(c => c.id === columnId);
					const ownTasks = column.taskIds.map(t => tasks.find(tt => tt.id === t));

					return (
						<Grid item key={columnId}>
							<DroppableColumn
								column={column}
								ownTasks={ownTasks}
							/>
						</Grid>
					)
				})}
			</Grid>
		</DragDropContext>
	)
};

export default DashboardDragDropContainer;
