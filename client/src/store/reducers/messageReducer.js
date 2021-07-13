import { MESSAGE_ADD, MESSAGE_DELETE } from "../actions/constants";
import { v4 as uuid } from "uuid";

const messageReducer = (
	state = {
		messages: [],
		error: null,
		success: false,
	},
	action
) => {
	switch (action.type) {
		case MESSAGE_ADD:
			return {
				...state,
				messages: [...state.messages, { ...action.payload, id: uuid() }],
				success: true,
			};
		case MESSAGE_DELETE:
			return {
				...state,
				messages: state.messages.filter(
					(message) => message.id !== action.payload
				),
				success: true,
			};
		default:
			return state;
	}
};

export default messageReducer;
