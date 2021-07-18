import React from "react";
import { useDispatch } from "react-redux";
import Logo from "./Logo";

import { logout } from "../../store/actions/userActions";

const Header = () => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={classes.header}>
			<Logo />
			<button className={classes.logout} onClick={onLogout}>
				Logout
			</button>
		</div>
	);
};

const classes = {
	header:
		"w-full m-0 box-border p-3.5 bg-purple-600 text-white flex flex-row px-10 border-b-4 border-purple-800 justify-between",
	logout: "justify-end hover:opacity-60",
};

export default Header;
