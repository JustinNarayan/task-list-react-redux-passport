import {
	COMMENT_LIST_REQUEST,
	COMMENT_LIST_SUCCESS,
	COMMENT_LIST_FAILURE,
	COMMENT_ADD_REQUEST,
	COMMENT_ADD_SUCCESS,
	COMMENT_ADD_FAILURE,
} from "../actions/constants";

export const commentListReducer = (
	state = {
		loading: false,
		comments: [],
		error: null,
		success: false,
	},
	action
) => {
	switch (action.type) {
		case COMMENT_LIST_REQUEST:
			return { loading: true, comments: [] };
		case COMMENT_LIST_SUCCESS:
			return {
				loading: false,
				comments: action.payload,
			};
		case COMMENT_LIST_FAILURE:
			return { loading: false, comments: [], error: action.payload };
		default:
			return state;
	}
};

export const commentAddReducer = (
	state = {
		loading: false,
		error: null,
		success: false,
	},
	action
) => {
	switch (action.type) {
		case COMMENT_ADD_REQUEST:
			return { loading: true };
		case COMMENT_ADD_SUCCESS:
			return { loading: false, success: true };
		case COMMENT_ADD_FAILURE: {
			return { loading: false, error: action.payload };
		}
		default:
			return state;
	}
};
