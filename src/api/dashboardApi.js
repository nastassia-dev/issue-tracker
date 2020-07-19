import { handleResponse, handleError } from './utils';

const loadDashboards = () => {
	return fetch(`/dashboards`)
		.then(handleResponse)
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

export default {
	loadDashboards,
	saveDashboard,
	deleteDashboard,
}

