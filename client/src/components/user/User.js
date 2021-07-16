import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiTask, BiUser, BiLock, BiKey, BiLogInCircle } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

import { login, register } from "../../store/actions/userActions";

import Alerts from "../layout/Alerts";

const User = ({ mode }) => {
	const [messages, setMessages] = useState([]);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const userAuth = useSelector((state) => state.userAuth);
	const { loading, notification } = userAuth;

	const onSubmit = (e) => {
		e.preventDefault();

		/// Validation
		const validationErrors = [];
		if (!username)
			validationErrors.push({
				text: "Please input your username",
				type: "warning",
			});
		if (!password)
			validationErrors.push({
				text: "Please input your password",
				type: "warning",
			});
		if (mode === "register") {
			if (!confirmPassword)
				validationErrors.push({
					text: "Please confirm your password",
					type: "warning",
				});
			if (password !== confirmPassword)
				validationErrors.push({
					text: "Passwords do not match",
					type: "warning",
				});
		}

		/// Push errors to messages
		setMessages(validationErrors);
		if (validationErrors.length) return;

		// Attempt login or registration
		dispatch(
			mode === "login"
				? login({ username, password })
				: register({ username, password })
		);
	};

	useEffect(() => {
		if (notification)
			setMessages([{ text: notification.text, type: notification.type }]);
	}, [notification]);

	return (
		<div className={classes.userCard}>
			<div className={classes.title}>
				<BiTask className={classes.icon} />
				Task List
			</div>
			<Alerts messages={messages} />
			<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
				<div className={classes.wholeInput}>
					<label htmlFor="input-username" className={classes.formLabel}>
						<span className={classes.inputTitle}>
							{mode === "register" ? "Set " : ""}Username
						</span>
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
						<span className={classes.inputTitle}>
							{mode === "register" ? "Set " : ""}Password
						</span>
					</label>
					<span className={classes.inputBox}>
						{mode === "login" ? (
							<BiLock size={28} className={classes.inputIcon} />
						) : (
							<BiKey size={28} className={classes.inputIcon} />
						)}
						<input
							type="password"
							id="input-password"
							onChange={(e) => setPassword(e.target.value)}
							className={classes.input}
						/>
					</span>
				</div>
				{mode === "register" && (
					<div className={classes.wholeInput}>
						<label
							htmlFor="input-confirmpassword"
							className={classes.formLabel}
						>
							<span className={classes.inputTitle}>Confirm Password</span>
						</label>
						<span className={classes.inputBox}>
							<BiLock size={28} className={classes.inputIcon} />
							<input
								type="password"
								id="input-confirmpassword"
								onChange={(e) => setConfirmPassword(e.target.value)}
								className={classes.input}
							/>
						</span>
					</div>
				)}

				<button className={classes.button} disabled={loading}>
					<div className={classes.buttonBox}>
						<span className={classes.buttonText}>
							{mode === "login" ? "Login" : "Register"}
						</span>
						{loading ? (
							<ImSpinner2 size={18} className={classes.loading} />
						) : (
							<BiLogInCircle size={22} className={classes.buttonIcon} />
						)}
					</div>
				</button>
			</form>
			{mode === "login" ? (
				<p className={classes.linkText}>
					No account?{" "}
					<Link className={classes.link} to="/register">
						Register here
					</Link>
				</p>
			) : (
				<p className={classes.linkText}>
					Got an account?{" "}
					<Link className={classes.link} to="/login">
						Login here
					</Link>
				</p>
			)}
		</div>
	);
};

const classes = {
	userCard:
		"w-96 md:w-1/2 mx-auto mt-12 rounded-2xl py-8 px-3 border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow-md",
	title:
		"flex flex-row justify-center font-semibold content-center text-center gap-x-3 text-3xl pb-10",
	icon: "my-auto",
	form: "mx-auto w-10/12 lg:w-4/5",
	wholeInput: "mb-6",
	formLabel: "block text-left pl-9 mb-0",
	inputTitle: "text-sm font-light justify-left",
	inputBox: "flex flex-row justify-start",
	inputIcon: "mr-2 my-auto rounded-lg p-0.5",
	input:
		"mr-1 py-0.5 px-1.5 block w-full px-0.5 outline-none border-0 border-b-2 border-gray-200 text-base text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	button: "rounded-xl bg-purple-500 text-white w-11/12 h-10 mt-8 mb-4",
	buttonBox: "flex flex-row w-20 py-auto gap-x-0 mx-auto",
	buttonText: "flex-auto my-auto",
	buttonIcon: "flex-auto my-auto pt-0.5",
	loading: "animate-spin text-white my-auto flex-auto ml-1",
	linkText: "text-sm",
	link: "underline hover:text-purple-500",
};

export default User;
