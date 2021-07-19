import axios from "axios";
import {
	TASKS_GET_REQUEST,
	TASKS_GET_SUCCESS,
	TASKS_GET_FAILURE,
	TASK_UPDATE_REQUEST,
	TASK_UPDATE_SUCCESS,
	TASK_UPDATE_FAILURE,
} from "../../constants/taskConstants";

import checkAuth from "./checkAuthActions";

const url = `http://localhost:5000/api/tasks`;
axios.defaults.withCredentials = true;

export const getTasks = () => async (dispatch) => {
	try {
		dispatch({ type: TASKS_GET_REQUEST });

		const { data } = await axios.get(`${url}`);

		checkAuth(data, dispatch);

		if (data.err) throw data;

		dispatch({ type: TASKS_GET_SUCCESS, payload: data });
	} catch (caught) {
		dispatch({ type: TASKS_GET_FAILURE, payload: caught });
	}
};

export const updateTask =
	({ id, updatedParameters }) =>
	async (dispatch) => {
		try {
			dispatch({ type: TASK_UPDATE_REQUEST });

			const { data } = await axios.put(`${url}/${id}`, updatedParameters);

			checkAuth(data, dispatch);

			if (data.err) throw data;

			dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });

			// Refetch tasks to see updated
			dispatch(getTasks());
		} catch (caught) {
			dispatch({ type: TASK_UPDATE_FAILURE, payload: caught });
		}
	};