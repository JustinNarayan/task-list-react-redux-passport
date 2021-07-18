import { combineReducers } from "redux";
import { userAuthReducer } from "./userReducer";
import { getTasksReducer } from "./taskReducer";

export default combineReducers({
	userAuth: userAuthReducer,
	getTasks: getTasksReducer,
});
