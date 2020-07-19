import * as types from '../actions/types';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboards, action) {
	switch(action.type) {
		case types.LOAD_DASHBOARDS_SUCCESS:
			return action.dashboards;
		case types.SAVE_DASHBOARD_SUCCESS:
			return [...state, {...action.dashboard}];
		case types.UPDATE_DASHBOARD_SUCCESS:
			return state.map(d => d.id === action.dashboard.id ? action.dashboard : d);
		case types.DELETE_DASHBOARD_SUCCESS:
			return state.filter(d => d.id !== action.dashboardId);
		default:
			return state;
	}
}
