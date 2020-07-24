import * as types from '../actions/types';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {
	switch(action.type) {
		case types.RESET_DASHBOARD:
			return {
				...initialState.dashboard,
			};
		case types.LOAD_DASHBOARD_SUCCESS:
			return {
				...state,
				isLoading: false,
				loadError: null,
				dashboard: {...action.dashboard},
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
				dashboard: {...action.dashboard},
			};
		case types.UPDATE_DASHBOARD_SUCCESS:
			return {
				...state,
				isSaving: false,
				dashboard: {...action.dashboard},
			};
		case types.SAVE_COLUMN_SUCCESS:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					columns: state.dashboard.columns
						.map(c => (c.id === action.column) ? action.column : c),
				},
			};
		case types.SAVE_TASK_SUCCESS:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					columns: state.dashboard.columns
						.map(c => (c.id === action.column) ? action.column : c),
					tasks: [...state.dashboard.tasks, action.task],
				}
			};
		default:
			return state;
	}
}
