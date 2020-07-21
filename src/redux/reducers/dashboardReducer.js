import * as types from '../actions/types';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {
	switch(action.type) {
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
