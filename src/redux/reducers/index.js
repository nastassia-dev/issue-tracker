import { combineReducers } from 'redux';

import taskReducer from './taskReducer';
import dashboardReducer from './dashboardsReducer';

const rootReducer = combineReducers({
	tasks: taskReducer,
	dashboards: dashboardReducer,
});

export default rootReducer;
