import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ManageTaskDialog from './ManageTaskDialog';

const ManageTaskContainer = ({ atLimit, saveTask, deleteTask }) => {
	const [isOpen, setIsOpen] = useState(false);

	if (isOpen) {
		return (
			<ManageTaskDialog
				isOpen={isOpen}
				atLimit={atLimit}
				setIsOpen={setIsOpen}
				saveTask={saveTask}
				deleteTask={deleteTask}
			/>
		);
	}

	return (
		<Tooltip title='Create Task'>
			<IconButton
				style={{ float: 'right', cursor: 'pointer' }}
				size='small'
				onClick={() => setIsOpen(true)}
			>
				<AddIcon />
			</IconButton>
		</Tooltip>
	);
};

ManageTaskContainer.defaultProps = {
	atLimit: true,
};
ManageTaskContainer.propTypes = {
	atLimit: PropTypes.bool,
	saveTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
};

export default ManageTaskContainer;
