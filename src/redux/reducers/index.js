import { combineReducers } from 'redux';

import taskReducer from './taskReducer';
import dashboardsReducer from './dashboardsReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
	tasks: taskReducer,
	dashboards: dashboardsReducer,
	dashboard: dashboardReducer,
});

export default rootReducer;
