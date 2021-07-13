import axios from "axios";
import {
	COMMENT_LIST_REQUEST,
	COMMENT_LIST_SUCCESS,
	COMMENT_LIST_FAILURE,
	COMMENT_ADD_REQUEST,
	COMMENT_ADD_SUCCESS,
	COMMENT_ADD_FAILURE,
} from "./constants";

import { addMessage } from "./messageActions";

const arrayLimit = 20; // Limit size of array

export const listComments = () => async (dispatch) => {
	try {
		// Notify reducer that a request is made
		dispatch({ type: COMMENT_LIST_REQUEST });

		// Call the API
		const res = await axios.get(
			"https://jsonplaceholder.typicode.com/comments"
		);
		const data = await res.data
			.map(({ id, name, body, email }) => ({ id, name, body, email })) // remove unnecessary fields
			.filter((comment) => comment.id <= arrayLimit);

		// Indicate the request was successful
		dispatch({ type: COMMENT_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch(
			addMessage({
				text: "Encountered an error while fetching comments",
				status: "failure",
			})
		);

		// Indicate the request was a failure
		dispatch({ type: COMMENT_LIST_FAILURE, payload: err });
	}
};

export const addComment =
	({ name, body, email }) =>
	async (dispatch) => {
		try {
			dispatch({ type: COMMENT_ADD_REQUEST });

			const res = await axios.post(
				"https://jsonplaceholder.typicode.com/comments",
				{ name, body, email }
			);
			const data = await res.data;

			dispatch({ type: COMMENT_ADD_SUCCESS, payload: data });

			dispatch(
				addMessage({
					text: "Comment successfully added",
					status: "success",
				})
			);
		} catch (err) {
			dispatch({ type: COMMENT_ADD_FAILURE, payload: err });

			dispatch(
				addMessage({
					text: "Encountered an error while adding comment",
					status: "failure",
				})
			);
		}
	};
