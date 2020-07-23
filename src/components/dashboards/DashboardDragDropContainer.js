import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';

import DroppableColumn from './DroppableColumn';

const DashboardDragDropContainer = ({ dashboard: { columns, columnOrder } }) => {
	const onDragStart = () => {};
	const onDragUpdate = () => {};
	const onDragEnd = () => {};

	return (
		<DragDropContext
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onDragEnd={onDragEnd}
		>
			<Grid container justify='flex-start' spacing={1}>
				{columnOrder.map((columnId, index) => {
					const column = columns.find(c => c.id === columnId);
					return (
						<Grid item key={columnId}>
							<DroppableColumn
								column={column}
								tasks={column.taskIds}
							/>
						</Grid>
					)
				})}
			</Grid>
		</DragDropContext>
	)

};

export default DashboardDragDropContainer;
