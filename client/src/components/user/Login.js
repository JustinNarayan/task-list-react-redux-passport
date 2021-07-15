import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiTask, BiUser, BiLock, BiCaretRightCircle } from "react-icons/bi";

import { login } from "../../store/actions/userActions";

import Alert from "../layout/Alert";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ username, password }));
	};

	return (
		<div className={classes.userCard}>
			<div className={classes.title}>
				<BiTask className={classes.icon} />
				Task List
			</div>
			<Alert message={"Here is some text"} type={"success"} />
			<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
				<div className={classes.wholeInput}>
					<label htmlFor="input-username" className={classes.formLabel}>
						<span className={classes.inputTitle}>Username</span>
					</label>
					<span className={classes.inputBox}>
						<BiUser size={28} className={classes.inputIcon} />
						<input
							type="text"
							id="input-username"
							onChange={(e) => setUsername(e.target.value)}
							className={classes.input}
						/>
					</span>
				</div>
				<div className={classes.wholeInput}>
					<label htmlFor="input-password" className={classes.formLabel}>
						<span className={classes.inputTitle}>Password</span>
					</label>
					<span className={classes.inputBox}>
						<BiLock size={28} className={classes.inputIcon} />
						<input
							type="password"
							id="input-password"
							onChange={(e) => setPassword(e.target.value)}
							className={classes.input}
						/>
					</span>
				</div>
				<button className={classes.button}>
					<div className={classes.buttonBox}>
						<span className={classes.buttonText}>Login</span>
						<BiCaretRightCircle size={20} className={classes.buttonIcon} />
					</div>
				</button>
			</form>
		</div>
	);
};

const classes = {
	userCard:
		"w-72 lg:w-1/3 mx-auto mt-12 rounded-2xl py-8 px-3 border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow-md",
	title:
		"flex flex-row justify-center font-semibold content-center text-center gap-x-3 text-3xl pb-16",
	icon: "my-auto",
	form: "mx-auto w-10/12 lg:w-4/5",
	wholeInput: "mb-6",
	formLabel: "block text-left pl-9 mb-0",
	inputTitle: "text-sm font-light justify-left",
	inputBox: "flex flex-row justify-start",
	inputIcon: "mr-2 my-auto rounded-lg p-0.5",
	input:
		"mr-4 py-0.5 px-1.5 block w-full px-0.5 outline-none border-0 border-b-2 border-gray-200 text-base text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	button: "rounded-xl bg-purple-500 text-white w-11/12 h-10 mt-8 mb-4",
	buttonBox: "flex flex-row w-20 py-auto gap-x-0 mx-auto",
	buttonText: "flex-auto my-auto",
	buttonIcon: "flex-auto my-auto pt-0.5",
};

export default Login;
