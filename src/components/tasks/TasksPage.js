import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as tasksActions from '../../redux/actions/tasksActions';

const TasksPage = ({ tasks, loadTasks }) => {
	useEffect(() => {
		if (tasks.length === 0) {
			loadTasks();
		}
	}, []);

	return (
		<div>
			<h3>Issues</h3>
			{tasks.map(t => {
				return (
					<div key={t.id}>{t.title}</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		tasks: state.tasks,
	}
};
const mapDispatchToProps = dispatch => {
	return {
		loadTasks: () => dispatch(tasksActions.loadTasks()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
