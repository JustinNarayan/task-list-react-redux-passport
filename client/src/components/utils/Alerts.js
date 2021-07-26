import React from "react";
import Alert from "./Alert";

const Alerts = ({ extraClasses, messages }) => {
	return (
		<div className={classes.container}>
			<div className={`${classes.messages} ${extraClasses}`}>
				{messages.map((message, index) => (
					<Alert key={index} text={message.text} type={message.type} />
				))}
			</div>
		</div>
	);
};

const classes = {
	container: "w-full",
	messages: "mx-auto mt-3",
};

export default Alerts;
