import * as types from '../actions/types';
import initialState from './initialState';
import { sortAndSplitDashboards } from '../../api/utils';

export default function dashboardsReducer (state = initialState.dashboards, action) {
	switch (action.type) {
		case types.LOAD_DASHBOARDS_START:
			return {
				...state,
				isLoading: true,
			};
		case types.LOAD_DASHBOARDS_SUCCESS:
			return {
				...state,
				isLoading: false,
				active: action.dashboards.active,
				archived: action.dashboards.archived,
				total: action.dashboards.total,
			};
		case types.UPDATE_DASHBOARD_SUCCESS:
			const dashboards = [...state.active, ...state.archived]
				.map(d => (d.id === action.dashboard.id ? action.dashboard : d));
			const data = sortAndSplitDashboards(dashboards);
			return {
				...state,
				isSaving: false,
				archived: data.archived,
				active: data.active,
			};
		case types.DELETE_DASHBOARD_OPTIMISTIC:
			return {
				...state,
				total: state.total - 1,
				active: state.active.filter(d => d.id !== action.id),
				archived: state.archived.filter(d => d.id !== action.id),
			};
		default:
			return state;
	}
}
