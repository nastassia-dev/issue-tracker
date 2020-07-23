import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DraggableTask = ({ task, index }) => {
	return (
		<Draggable
			draggableId={task.id}
			index={index}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{task.content}
				</div>
			)}
		</Draggable>
	)

};

export default DraggableTask;
