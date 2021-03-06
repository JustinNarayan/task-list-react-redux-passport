import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { BiUser, BiLock, BiKey, BiLogInCircle } from "react-icons/bi";

import { login, register } from "../../store/actions/userActions";

import Alerts from "../utils/Alerts";
import CustomSubmit from "../utils/forms/CustomSubmit";
import CustomInput from "../utils/forms/CustomInput";

const User = ({ mode, unauthorized = false }) => {
	/// Set component state variables
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();

	/// Check if user has been redirected to login page
	const redirectMessage = unauthorized
		? { text: "You are not logged in", type: "failure" }
		: null;
	const [messages, setMessages] = useState(
		redirectMessage ? [redirectMessage] : []
	);

	// Get global state values
	const { loading, notification, userInfo } = useSelector(
		(state) => state.userAuth
	);

	/// Login/Register submission
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

	/// Reset messages upon component loading (or login/register redirection)
	useEffect(() => {
		if (!unauthorized) setMessages([]);
		// eslint-disable-next-line
	}, [mode]);

	/// Show notification upon global state change
	useEffect(() => {
		if (notification)
			setMessages([{ text: notification.text, type: notification.type }]);
	}, [notification]);

	return (
		<>
			{userInfo && <Redirect to="/home" />}
			<div className={classes.userCard}>
				<span className={classes.userCardTitle}>
					{mode === "login" ? "Login" : "Register"}
				</span>
				<Alerts extraClasses={classes.alerts} messages={messages} />
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					{/* (Set) Username */}
					<CustomInput
						IconElement={BiUser}
						inputLabel={`${mode === "register" ? "Set " : ""} Username`}
						onChange={(e) => setUsername(e.target.value)}
					/>
					{/* (Set) Password */}
					<CustomInput
						IconElement={mode === "login" ? BiLock : BiKey}
						inputLabel={`${mode === "register" ? "Set " : ""} Password`}
						inputType="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* Confirm Password (for registration) */}
					{mode === "register" && (
						<CustomInput
							IconElement={BiLock}
							inputLabel="Confirm Password"
							inputType="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					)}
					<CustomSubmit loadingState={loading} IconElement={BiLogInCircle} />
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
						<Link className={classes.link} to="/">
							Login here
						</Link>
					</p>
				)}
			</div>
		</>
	);
};

const classes = {
	userCard:
		"w-96 md:w-1/2 mt-6 mx-auto rounded-2xl py-8 px-3 border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow-md",
	userCardTitle: "block mb-6 text-3xl font-semibold uppercase",
	alerts: "w-9/12 mb-4",
	form: "mx-auto w-10/12 lg:w-4/5",
	linkText: "text-sm",
	link: "underline hover:text-purple-500",
};

export default User;
