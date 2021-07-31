import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_GET_REQUEST,
	USER_GET_SUCCESS,
	USER_GET_FAILURE,
} from "../../constants/userConstants";

const url = `http://localhost:5000/api/users`;
axios.defaults.withCredentials = true;

export const login =
	({ username, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });

			const { data } = await axios.post(`${url}/login`, { username, password });

			if (data.err) throw data;

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		} catch (caught) {
			dispatch({ type: USER_LOGIN_FAILURE, payload: caught });
		}
	};

export const register =
	({ username, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const { data } = await axios.post(`${url}/register`, {
				username,
				password,
			});

			if (data.err) throw data;

			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		} catch (caught) {
			dispatch({ type: USER_REGISTER_FAILURE, payload: caught });
		}
	};

export const logout = () => async (dispatch) => {
	await axios.get(`${url}/logout`);
	dispatch({ type: USER_LOGOUT });
};

export const getUser = () => async (dispatch) => {
	try {
		dispatch({ type: USER_GET_REQUEST });

		const { data } = await axios.get(`${url}/current`);

		dispatch({ type: USER_GET_SUCCESS, payload: data });
	} catch (caught) {
		dispatch({ type: USER_GET_FAILURE, payload: caught });
	}
};
