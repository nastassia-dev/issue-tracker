import * as types from './types';

export function loadDashboardsSuccess(dashboards) {
	return {
		type: types.LOAD_DASHBOARDS_SUCCESS,
		dashboards,
	}
}

export function saveDashboardSuccess(dashboard) {
	return {
		type: types.SAVE_DASHBOARD_SUCCESS,
		dashboard,
	}
}

export function loadDashboards() {
	return function (dispatch) {
		return fetch(`/dashboards`)
			.then(res => res.json())
			.then(dashboards => {
				dispatch(loadDashboardsSuccess(dashboards))
			})
			.catch(e => {
				throw e;
			});
	}
}

export function saveDashboard(dashboard) {
	return function (dispatch) {
		return fetch('/dashboards', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(dashboard)
		})
			.then(res => res.json())
			.then(res => {
				dispatch(saveDashboardSuccess(res))
			})
			.catch(e => {
				throw e;
			});
	}
}
