import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage } from "../store/actions/messageActions";

import Message from "./Message";

const Messages = () => {
	const { messages } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	const deleteFunction = (id) => {
		dispatch(deleteMessage(id));
	};

	return (
		<>
			{messages.map((message) => (
				<Message
					key={message.id}
					message={message}
					deleteFunction={deleteFunction}
				/>
			))}
		</>
	);
};

export default Messages;
