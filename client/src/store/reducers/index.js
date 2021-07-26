import { combineReducers } from "redux";
import { userAuthReducer } from "./userReducer";
import {
	getTasksReducer,
	createTaskReducer,
	updateTaskReducer,
} from "./taskReducer";

export default combineReducers({
	userAuth: userAuthReducer,
	getTasks: getTasksReducer,
	createTask: createTaskReducer,
	updateTask: updateTaskReducer,
});
