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
		default:
			return state;
	}
}
