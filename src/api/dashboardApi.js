import { handleResponse, handleError } from './utils';

const loadDashboards = () => {
	return fetch(`/dashboards`)
		.then(handleResponse)
		.then(dashboards => dashboards.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1))
		.catch(handleError);
};

const saveDashboard = dashboard => {
	return fetch(`/dashboards/${dashboard.id || ''}`, {
		method: dashboard.id ? 'PUT' : 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(dashboard)
	})
		.then(handleResponse)
		.catch(handleError);
};

const deleteDashboard = id => {
	return fetch(`/dashboards/${id}`, { method: 'DELETE' })
		.then(handleResponse)
		.catch(handleError);
};

const createColumn = (id, title, order) => {
	return fetch(`/dashboards/${id}/columns`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ title, order })
	})
		.then(handleResponse)
		.catch(handleError);
};

const loadDashboard = (slug) => {
	return fetch(`/dashboards?slug=${slug}&_embed=columns`)
		.then(handleResponse)
		.catch(handleError);
};

const saveColumn = column => {
	return fetch(`/columns/${column.id}`, {
		method: 'PUT',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(column)
	})
		.then(handleResponse)
		.catch(handleError);
};

const saveTask = (column, task) => {
	return fetch(`/columns/${column.id}/tasks`, {
			method: 'POST',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify(task),
		})
		.then(handleResponse)
		.then(savedTask => {
			const taskId = savedTask.id;
			const taskIds = [...column.taskIds, taskId];

			return fetch(`/columns/${column.id}`, {
				method: 'PUT',
				headers: {'content-type': 'application/json'},
				body: JSON.stringify({...column, taskIds }),
			})
				.then(handleResponse)
				.then(savedColumn => ({
					task: savedTask,
					column: savedColumn
				}))
		})
		.catch(handleError);
};

export default {
	loadDashboards,
	loadDashboard,
	saveDashboard,
	deleteDashboard,
	createColumn,
	saveColumn,
	saveTask,
}

