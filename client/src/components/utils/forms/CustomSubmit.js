import React from "react";

import LoadingSpinner from "../LoadingSpinner";

const CustomSubmit = ({
	loadingState = false,
	additionalDisabledState = false,
	IconElement,
}) => {
	return (
		<button
			className={classes.button}
			disabled={loadingState || additionalDisabledState}
			type="submit"
		>
			<div className={classes.buttonBox}>
				{loadingState ? (
					<LoadingSpinner textColorClass={"text-white"} size={18} />
				) : (
					<IconElement size={22} className={classes.buttonIcon} />
				)}
			</div>
		</button>
	);
};

const classes = {
	button:
		"rounded-xl bg-purple-600 text-white w-11/12 h-10 mt-6 mb-4 hover:ring-2 disabled:ring-2 hover:ring-purple-200 hover:bg-purple-500 disabled:bg-purple-400 disabled:ring-purple-100 disabled:cursor-not-allowed",
	buttonBox: "flex flex-row w-20 py-auto gap-x-0 mx-auto",
	buttonText: "flex-auto my-auto",
	buttonIcon: "flex-auto my-auto pt-0.5",
};

export default CustomSubmit;
