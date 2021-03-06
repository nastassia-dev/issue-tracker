import * as types from '../actions/types';
import initialState from './initialState';

export default function dashboardReducer (state = initialState.dashboard, action) {
	switch (action.type) {
		case types.RESET_DASHBOARD:
			return {
				...initialState.dashboard,
			};
		case types.LOAD_DASHBOARD_SUCCESS:
			return {
				...state,
				isLoading: false,
				loadError: null,
				dashboard: { ...action.dashboard },
			};
		case types.LOAD_DASHBOARD_ERROR:
			return {
				...state,
				isLoading: false,
				loadError: action.error,
			};
		case types.SAVE_DASHBOARD_SUCCESS:
			return {
				...state,
				isSaving: false,
				dashboard: { ...action.dashboard },
			};
		case types.UPDATE_DASHBOARD_SUCCESS:
			return {
				...state,
				isSaving: false,
				dashboard: { ...action.dashboard },
			};
		case types.SAVE_COLUMN_SUCCESS:
			// TODO split create and update
			if (action.column.dashboard) {
				return {
					...state,
					dashboard: {
						...state.dashboard,
						...action.column.dashboard,
						columns: [...state.dashboard.columns, action.column.column],
					},
				};
			}
			if (Array.isArray(action.column)) {
				const ids = state.dashboard.columns.map(c => c.id);
				const columns = [...state.dashboard.columns];
				action.column.forEach((c) => {
					const index = ids.indexOf(c.id);
					columns.splice(index, 1, c);
				});
				return {
					...state,
					dashboard: {
						...state.dashboard,
						columns,
					},
				};
			}
			return {
				...state,
				dashboard: {
					...state.dashboard,
					columns: state.dashboard.columns
						.map(c => ((c.id === action.column.id) ? action.column : c)),
				},
			};
		case types.DELETE_COLUMN_OPTIMISTIC:
			const columnOrder = state.dashboard.columnOrder.filter(id => id !== action.id);
			return {
				...state,
				dashboard: {
					...state.dashboard,
					columnOrder,
					columns: state.dashboard.columns.filter(c => c.id !== action.id),
				},
			};
		case types.SAVE_TASK_SUCCESS:
			// TODO split UPDATE(SAVE) & CREATE
			const columns = action.column
				? state.dashboard.columns
					.map(c => ((c.id === action.column.id) ? action.column : c))
				: state.dashboard.columns;
			const task = state.dashboard.tasks.find(t => t.id === action.task.id);
			const tasks = task
				? state.dashboard.tasks.map(t => ((t.id === action.task.id) ? action.task : t))
				: [...state.dashboard.tasks, action.task];
			return {
				...state,
				dashboard: {
					...state.dashboard,
					columns,
					tasks,
				},
			};
		case types.DELETE_TASK_OPTIMISTIC:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					columns: state.dashboard.columns.map(c => ((c.id === action.column.id) ? action.column : c)),
					tasks: state.dashboard.tasks.filter(t => t !== action.id),
				},
			};
		default:
			return state;
	}
}
