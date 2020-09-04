import * as types from '../actions/types';
import initialState from './initialState';

export default function taskReducer (state = initialState.tasks, action) {
	switch (action.type) {
		case types.LOAD_TASKS_SUCCESS:
			return action.tasks;
		default:
			return state;
	}
}
