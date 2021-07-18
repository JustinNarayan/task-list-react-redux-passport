import {
	TASKS_GET_REQUEST,
	TASKS_GET_SUCCESS,
	TASKS_GET_FAILURE,
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
