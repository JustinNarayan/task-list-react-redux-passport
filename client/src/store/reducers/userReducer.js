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

export const userAuthReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
		case USER_REGISTER_REQUEST:
		case USER_GET_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
		case USER_GET_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAILURE:
		case USER_REGISTER_SUCCESS:
		case USER_REGISTER_FAILURE:
		case USER_GET_FAILURE:
			return { loading: false, notification: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
