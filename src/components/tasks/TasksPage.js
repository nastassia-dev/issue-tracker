import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as tasksActions from '../../redux/actions/tasksActions';
import Title from '../common/Title';

const TasksPage = ({ tasks, loadTasks }) => {
	useEffect(() => {
		if (tasks.length === 0) {
			loadTasks();
		}
	}, []);

	return (
		<>
			<Title>Issues</Title>
			{tasks.map(t => {
				return (
					<div key={t.id}>{t.title}</div>
				);
			})}
		</>
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
