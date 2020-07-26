import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ManageTaskDialog from './ManageTaskDialog';

const ManageTaskContainer = ({ saveTask }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		isOpen
			?
				<ManageTaskDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					saveTask={saveTask}
				/>
			:
			<Tooltip title='Create Task'>
				<IconButton
					style={{float: 'right', cursor: 'pointer'}}
					size='small'
					onClick={() => setIsOpen(true)}
				>
					<AddIcon />
				</IconButton>
			</Tooltip>
	);
};

export default ManageTaskContainer;
