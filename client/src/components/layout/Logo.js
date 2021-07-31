import React from "react";
import { BiTask } from "react-icons/bi";

const Logo = () => {
	return (
		<div className={classes.title}>
			<BiTask className={classes.icon} />
			Task List
		</div>
	);
};

const classes = {
	title:
		"flex flex-row justify-center font-semibold content-center text-center gap-x-2 text-3xl select-none cursor-default",
	icon: "my-auto pt-1",
};

export default Logo;
