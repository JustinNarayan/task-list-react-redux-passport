import React from "react";

const Alert = ({ message, type }) => {
	const getAlertBoxClass = () => {
		switch (type) {
			case "success":
				return `${classes.alertBox} ${classes.successBox}`;
			case "failure":
				return `${classes.alertBox} ${classes.failureBox}`;
			default:
				return `${classes.alertBox} ${classes.warningBox}`;
		}
	};

	return (
		<div className={getAlertBoxClass()}>
			<p>{message}</p>
		</div>
	);
};

const classes = {
	alertBox: "w-full",
	successBox: "bg-green-100",
};

export default Alert;
