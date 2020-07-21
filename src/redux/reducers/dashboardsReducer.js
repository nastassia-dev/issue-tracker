import * as types from '../actions/types';
import initialState from './initialState';

export default function dashboardsReducer(state = initialState.dashboards, action) {
	switch(action.type) {
		case types.LOAD_DASHBOARDS_START:
			return {
				...state,
				isLoading: true,
			};
		case types.LOAD_DASHBOARDS_SUCCESS:
			return {
				...state,
				isLoading: false,
				dashboards: action.dashboards,
			};
		case types.UPDATE_DASHBOARD_SUCCESS:
			return {
				...state,
				isSaving: false,
				dashboards: state.dashboards.map(d => d.id === action.dashboard.id ? action.dashboard : d),
			};
		case types.DELETE_DASHBOARD_OPTIMISTIC:
			return {
				...state,
				dashboards: state.dashboards.filter(d => d.id !== action.id),
			};
		default:
			return state;
	}
}
