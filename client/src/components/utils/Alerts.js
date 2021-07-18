import React from "react";
import Alert from "./Alert";

const Alerts = ({ extraClasses, messages }) => {
	return (
		<div className={`${classes.messages} ${extraClasses}`}>
			{messages.map((message, index) => (
				<Alert key={index} text={message.text} type={message.type} />
			))}
		</div>
	);
};

const classes = {
	messages: "w-3/4 mx-auto",
};

export default Alerts;
