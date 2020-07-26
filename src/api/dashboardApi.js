import fetchApi, { reqType } from './fetchApi';

const loadDashboards = () =>
	fetchApi.GET('/dashboards')
		.then(dashboards => dashboards.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1));

const saveDashboard = dashboard => {
	const id = dashboard.id;
	const url = id ? `/dashboards/${id}` : '/dashboards/columns';
	const method = id ? reqType.PUT : reqType.POST;
	return fetchApi[method](url, dashboard);
};

const deleteDashboard = id => fetchApi.DELETE(`/dashboards/${id}`);

const createColumn = (id, title) =>
	fetchApi.POST(`/dashboards/${id}/columns`, { title });

const loadDashboard = (slug) => fetchApi.GET(`/dashboards?slug=${slug}&_embed=columns`);

const saveColumn = column => fetchApi.PUT(`/columns/${column.id}`, column);

const saveColumnBulk = columns => {
	const promises = columns.map(c => fetchApi.PUT(`/columns/${c.id}`, c));
	return Promise.all(promises);
};

const saveTask = (column, task) => {
	const taskId = task.id;
	const url = taskId
		? `/tasks/${taskId}`
		: `/columns/${column.id}/tasks`;
	const method = taskId ? reqType.PUT : reqType.POST;
	return fetchApi[method](url, task)
		.then(savedTask => {
			if (taskId) return { task: savedTask };

			const savedTaskId = savedTask.id;
			const taskIds = [...column.taskIds, savedTaskId];
			return fetchApi.PUT(`/columns/${column.id}`, {...column, taskIds })
				.then(savedColumn => ({
					task: savedTask,
					column: savedColumn
				}));
		});
};

export default {
	loadDashboards,
	loadDashboard,
	saveDashboard,
	deleteDashboard,
	createColumn,
	saveColumn,
	saveColumnBulk,
	saveTask,
}

