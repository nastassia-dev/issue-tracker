import * as types from './types';
import dashboardApi from '../../api/dashboardApi';

export const loadDashboardsStart = () => ({ type: types.LOAD_DASHBOARDS_START });
export const loadDashboardsSuccess = dashboards => (
	{
		type: types.LOAD_DASHBOARDS_SUCCESS,
		dashboards,
	});
export const loadDashboardsError = error => (
	{
		type: types.LOAD_DASHBOARDS_ERROR,
		error,
	});

export const saveDashboardStart = () => ({ type: types.SAVE_DASHBOARD_START });
export const saveDashboardSuccess = dashboard => (
	{
		type: types.SAVE_DASHBOARD_SUCCESS,
		dashboard,
	});
export const saveDashboardError = error => (
	{
		type: types.SAVE_DASHBOARD_ERROR,
		error,
	});
export const updateDashboardSuccess = dashboard => (
	{
		type: types.UPDATE_DASHBOARD_SUCCESS,
		dashboard,
	});

export const deleteDashboardOptimistic = id => (
	{
		type: types.DELETE_DASHBOARD_OPTIMISTIC,
		id,
	});
export const deleteDashboardError = error => (
	{
		type: types.DELETE_DASHBOARD_ERROR,
		error,
	});

export function loadDashboards() {
	return function (dispatch) {
		dispatch(loadDashboardsStart());
		return dashboardApi
			.loadDashboards()
			.then(dashboards => dispatch(loadDashboardsSuccess(dashboards)))
			.catch(e => dispatch(loadDashboardsError(e)));
	}
}

export function saveDashboard(dashboard) {
	const dashboardId = dashboard.id;
	return function (dispatch) {
		dispatch(saveDashboardStart());
		return dashboardApi
			.saveDashboard(dashboard)
			.then(savedDashboard => {
				dashboardId
					? dispatch(updateDashboardSuccess(savedDashboard))
					: dispatch(saveDashboardSuccess(savedDashboard));
			})
			.catch(e => dispatch(saveDashboardError(e)));
	}
}

export function deleteDashboard(dashboard) {
	const dashboardId = dashboard.id;
	return function (dispatch) {
		dispatch(deleteDashboardOptimistic(dashboardId));
		return dashboardApi
			.deleteDashboard(dashboardId)
			.catch(e => dispatch(deleteDashboardError(e)));
	}
}
