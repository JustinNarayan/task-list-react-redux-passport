import {
	TASKS_GET_REQUEST,
	TASKS_GET_SUCCESS,
	TASKS_GET_FAILURE,
	TASK_UPDATE_REQUEST,
	TASK_UPDATE_SUCCESS,
	TASK_UPDATE_FAILURE,
	TASK_UPDATE_CLEAR_NOTIFICATION,
	TASK_CREATE_REQUEST,
	TASK_CREATE_SUCCESS,
	TASK_CREATE_FAILURE,
	TASK_CREATE_CLEAR_NOTIFICATION,
	TASK_DELETE_REQUEST,
	TASK_DELETE_SUCCESS,
	TASK_DELETE_FAILURE,
	TASK_DELETE_CLEAR_NOTIFICATION,
} from "../../constants/taskConstants";

export const getTasksReducer = (state = {}, action) => {
	switch (action.type) {
		case TASKS_GET_REQUEST:
			return { loading: true };
		case TASKS_GET_SUCCESS:
			return {
				loading: false,
				tasks: action.payload,
			};
		case TASKS_GET_FAILURE:
			return { loading: false, notification: action.payload };
		default:
			return state;
	}
};

export const createTaskReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_CREATE_REQUEST:
			return { loading: true };
		case TASK_CREATE_SUCCESS:
		case TASK_CREATE_FAILURE:
			return { loading: false, notification: action.payload };
		case TASK_CREATE_CLEAR_NOTIFICATION:
			return { notification: {} };
		default:
			return state;
	}
};

export const updateTaskReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_UPDATE_REQUEST:
			return { loading: true };
		case TASK_UPDATE_SUCCESS:
		case TASK_UPDATE_FAILURE:
			return { loading: false, notification: action.payload };
		case TASK_UPDATE_CLEAR_NOTIFICATION:
			return { notification: {} };
		default:
			return state;
	}
};

export const deleteTaskReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_DELETE_REQUEST:
			return { loading: true };
		case TASK_DELETE_SUCCESS:
			return { loading: false }; // no notification
		case TASK_DELETE_FAILURE:
			return { loading: false, notification: action.payload };
		case TASK_DELETE_CLEAR_NOTIFICATION:
			return { notification: {} };
		default:
			return state;
	}
};
