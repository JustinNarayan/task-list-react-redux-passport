import React from "react";
import Alert from "./Alert";

const Alerts = ({ messages }) => {
	return (
		<div className={classes.messages}>
			{messages.map((message, index) => (
				<Alert key={index} text={message.text} type={message.type} />
			))}
		</div>
	);
};

const classes = {
	messages: "w-3/4 mx-auto mb-4",
};

export default Alerts;
