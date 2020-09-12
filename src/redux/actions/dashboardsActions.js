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

export const resetDashboard = () => ({ type: types.RESET_DASHBOARD });
export const loadDashboardStart = () => ({ type: types.LOAD_DASHBOARD_START });
export const loadDashboardSuccess = dashboard => (
	{
		type: types.LOAD_DASHBOARD_SUCCESS,
		dashboard,
	});
export const loadDashboardError = error => (
	{
		type: types.LOAD_DASHBOARD_ERROR,
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

export const saveColumnSuccess = column => ({
	type: types.SAVE_COLUMN_SUCCESS,
	column,
});
export const saveColumnError = error => ({
	type: types.SAVE_COLUMN_ERROR,
	error,
});
export const deleteColumnOptimistic = id => ({
	type: types.DELETE_COLUMN_OPTIMISTIC,
	id,
});
export const deleteColumnError = error => ({
	type: types.DELETE_COLUMN_ERROR,
	error,
});

export const saveTaskStart = () => ({ type: types.SAVE_TASK_START });
export const saveTaskSuccess = ({ task, column }) => ({
	type: types.SAVE_TASK_SUCCESS,
	task,
	column,
});
export const saveTaskError = error => ({
	type: types.SAVE_TASK_ERROR,
	error,
});
export const deleteTaskOptimistic = (column, id) => ({
	type: types.DELETE_TASK_OPTIMISTIC,
	column,
	id,
});
export const deleteTaskError = error => ({
	type: types.DELETE_TASK_ERROR,
	error,
});

export function loadDashboards () {
	return function (dispatch) {
		dispatch(loadDashboardsStart());
		return dashboardApi
			.loadDashboards()
			.then(dashboards => dispatch(loadDashboardsSuccess(dashboards)))
			.catch(e => dispatch(loadDashboardsError(e)));
	};
}

export function saveDashboard (dashboard) {
	const dashboardId = dashboard.id;
	return function (dispatch) {
		dispatch(saveDashboardStart());
		return dashboardApi
			.saveDashboard(dashboard)
			.then((savedDashboard) => {
				dashboardId
					? dispatch(updateDashboardSuccess(savedDashboard))
					: dispatch(saveDashboardSuccess(savedDashboard));
				return savedDashboard;
			})
			.catch(e => dispatch(saveDashboardError(e)));
	};
}

export function deleteDashboard (dashboard) {
	const dashboardId = dashboard.id;
	return function (dispatch) {
		dispatch(deleteDashboardOptimistic(dashboardId));
		return dashboardApi
			.deleteDashboard(dashboardId)
			.catch(e => dispatch(deleteDashboardError(e)));
	};
}

export function loadDashboard (id) {
	return function (dispatch) {
		dispatch(loadDashboardStart());
		return dashboardApi
			.loadDashboard(id)
			.then((res) => {
				const dashboard = res[0];
				if (!dashboard) {
					dispatch(loadDashboardError('Not Found'));
				} else {
					dispatch(loadDashboardSuccess(dashboard));
				}
			})
			.catch(e => dispatch(loadDashboardError(e)));
	};
}

export function saveColumn (column) {
	return function (dispatch) {
		return dashboardApi
			.saveColumn(column)
			.then(savedColumn => dispatch(saveColumnSuccess(savedColumn)))
			.catch(e => dispatch(saveColumnError(e)));
	};
}
export function deleteColumn (dashboard, columnId) {
	return function (dispatch) {
		dispatch(deleteColumnOptimistic(columnId));
		const columnOrder = dashboard.columnOrder.filter(id => id !== columnId);
		return dashboardApi.saveDashboard({ ...dashboard, columnOrder })
			.then(() => dashboardApi.deleteColumn(columnId))
			.catch(e => dispatch(deleteColumnError(e)));
	};
}
export function saveColumnBulk (columns) {
	return function (dispatch) {
		// TODO add save optimistic
		dispatch(saveColumnSuccess(columns));
		return dashboardApi
			.saveColumnBulk(columns)
			// .then(savedColumns => dispatch(saveColumnSuccess(savedColumns)))
			.catch(e => dispatch(saveColumnError(e)));
	};
}

export function saveTask (column, task) {
	return function (dispatch) {
		dispatch(saveTaskStart());
		return dashboardApi
			.saveTask(column, task)
			.then(res => dispatch(saveTaskSuccess(res)))
			.catch(e => dispatch(saveTaskError(e)));
	};
}
export function deleteTask (column, id) {
	return function (dispatch) {
		const taskIds = column.taskIds.filter(t => t !== id);
		const newColumn = { ...column, taskIds };
		dispatch(deleteTaskOptimistic(newColumn, id));
		return dashboardApi.saveColumn(newColumn)
			.then(() => dashboardApi.deleteTask(id))
			.catch(e => dispatch(deleteTaskError(e)));
	};
}
