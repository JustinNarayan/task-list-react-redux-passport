import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
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

			if (!data._id) throw data;

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		} catch (err) {
			dispatch({ type: USER_LOGIN_FAIL, payload: err });
		}
	};
