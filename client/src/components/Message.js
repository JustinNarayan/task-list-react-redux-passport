import React from "react";

const Message = ({ message, deleteFunction }) => {
	return (
		<div className={"message " + message.status}>
			<p>{message.text}</p>
			<button onClick={() => deleteFunction(message.id)}>&times;</button>
		</div>
	);
};

export default Message;
