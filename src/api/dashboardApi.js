import fetchApi, { reqType } from './fetchApi';
import { sortAndSplitDashboards } from './utils';

const loadDashboards = () =>
	fetchApi.GET('/dashboards')
		.then(dashboards => {
			const total = dashboards.length;
			const data = sortAndSplitDashboards(dashboards);
			data.total = total;
			return data;
		});

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

const saveColumn = column => {
	const id = column.id;
	const method = id ? reqType.PUT : reqType.POST;
	return fetchApi[method](`/columns/${id || ''}`, column);
};
const deleteColumn = id => fetchApi.DELETE(`/columns/${id}`);

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
			return fetchApi.PUT(`/columns/${column.id}`, { ...column, taskIds })
				.then(savedColumn => ({
					task: savedTask,
					column: savedColumn
				}));
		});
};
const deleteTask = id => fetchApi.DELETE(`/tasks/${id}`);

export default {
	loadDashboards,
	loadDashboard,
	saveDashboard,
	deleteDashboard,
	createColumn,
	saveColumn,
	deleteColumn,
	saveColumnBulk,
	saveTask,
	deleteTask,
}

