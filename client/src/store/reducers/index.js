import { combineReducers } from "redux";
import { userAuthReducer } from "./userReducer";
import { getTasksReducer, updateTaskReducer } from "./taskReducer";

export default combineReducers({
	userAuth: userAuthReducer,
	getTasks: getTasksReducer,
	updateTask: updateTaskReducer,
});
