import { MESSAGE_ADD, MESSAGE_DELETE } from "./constants";

export const addMessage =
	({ text, status }) =>
	(dispatch) => {
		dispatch({ type: MESSAGE_ADD, payload: { text, status } });
	};

export const deleteMessage = (id) => (dispatch) => {
	dispatch({ type: MESSAGE_DELETE, payload: id });
};
