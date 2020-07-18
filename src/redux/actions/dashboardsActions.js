import * as types from './types';

export function loadDashboardsSuccess(dashboards) {
	return {
		type: types.LOAD_DASHBOARDS_SUCCESS,
		dashboards,
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
			})
	}
}
