import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from "../../constants/userConstants";

const url = "http://localhost:5000";

export const login =
	({ username, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });

			const { data } = await axios.post(`${url}/api/users/login`, {
				username,
				password,
			});

			if (data.err) throw data;

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		} catch (caught) {
			console.log(caught);
			dispatch({ type: USER_LOGIN_FAIL, payload: caught });
		}
	};

export const register =
	({ username, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const { data } = await axios.post(`${url}/api/users/register`, {
				username,
				password,
			});
			console.log(data);

			if (data.err) throw data;

			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		} catch (caught) {
			dispatch({ type: USER_REGISTER_FAIL, payload: caught });
		}
	};
