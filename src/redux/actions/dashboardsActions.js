import * as types from './types';
import dashboardApi from '../../api/dashboardApi';

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
export function updateDashboardSuccess(dashboard) {
	return {
		type: types.UPDATE_DASHBOARD_SUCCESS,
		dashboard,
	}
}
export function deleteDashboardSuccess(dashboardId) {
	return {
		type: types.DELETE_DASHBOARD_SUCCESS,
		dashboardId,
	}
}

export function loadDashboards() {
	return function (dispatch) {
		return dashboardApi.loadDashboards()
			.then(dashboards => {
				dispatch(loadDashboardsSuccess(dashboards))
			})
			.catch(e => {
				throw e;
			});
	}
}

export function saveDashboard(dashboard) {
	const dashboardId = dashboard.id;
	return function (dispatch) {
		return dashboardApi.saveDashboard(dashboard)
			.then(savedDashboard => {
				dashboardId
					? dispatch(updateDashboardSuccess(savedDashboard))
					: dispatch(saveDashboardSuccess(savedDashboard));
			})
			.catch(e => {
				throw e;
			});
	}
}

export function deleteDashboard(dashboard) {
	const dashboardId = dashboard.id;
	return function (dispatch) {
		return dashboardApi.deleteDashboard(dashboardId)
			.then(() => {
				dispatch(deleteDashboardSuccess(dashboardId));
			})
			.catch(e => {
				throw e;
			});
	}
}
