import * as types from '../actions/types';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboards, action) {
	switch(action.type) {
		case types.LOAD_DASHBOARDS_SUCCESS:
			return action.dashboards;
		default:
			return state;
	}
}
