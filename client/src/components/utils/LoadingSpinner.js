import React from "react";

import { ImSpinner2 } from "react-icons/im";

const LoadingSpinner = ({ textColorClass = "text-purple-600", size = 28 }) => {
	return (
		<ImSpinner2
			size={size}
			className={`${textColorClass} ${classes.loading}`}
		/>
	);
};

const classes = {
	loading: "animate-spin my-auto flex-auto ml-1",
};

export default LoadingSpinner;
