import * as types from './types';

export function loadTasksSuccess(tasks) {
	return {
		type: types.LOAD_TASKS_SUCCESS,
		tasks,
	}
}

export function loadTasks() {
	return function (dispatch) {
		return fetch(`/tasks`)
			.then(res => res.json())
			.then(tasks => {
				dispatch(loadTasksSuccess(tasks))
			})
			.catch(e => {
				throw e;
			})
	}
}
