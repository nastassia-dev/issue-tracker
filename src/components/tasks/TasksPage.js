import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as tasksActions from '../../redux/actions/tasksActions';
import Title from '../common/Title';
import { TaskShape } from '../../prop-type-shapes';

const TasksPage = ({ tasks, loadTasks }) => {
	useEffect(() => {
		if (tasks.length === 0) {
			loadTasks();
		}
	}, []);

	return (
		<>
			<Title>Issues</Title>
			{tasks.map(t => (
					<div key={t.id}>{t.title}</div>
				))}
		</>
	);
};

TasksPage.propTypes = {
	tasks: PropTypes.arrayOf(TaskShape).isRequired,
	loadTasks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	tasks: state.tasks,
});
const mapDispatchToProps = dispatch => ({
	loadTasks: () => dispatch(tasksActions.loadTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
