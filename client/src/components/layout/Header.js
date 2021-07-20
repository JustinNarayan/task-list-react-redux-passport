import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import ModalContainer from "../utils/ModalContainer";
import NewTask from "../views/NewTask";

import { logout } from "../../store/actions/userActions";

const Header = () => {
	const location = useLocation();
	const [showHeaderButtons, setShowHeaderButtons] = useState(false);

	useEffect(() => {
		switch (location.pathname.split("/")[1]) {
			case "":
			case "register":
			case "loggedout":
				return setShowHeaderButtons(false);
			default:
				return setShowHeaderButtons(true);
		}
	}, [location]);

	const [showNewTaskModal, setShowNewtaskModal] = useState(false);

	const toggleNewTaskModal = () => setShowNewtaskModal(!showNewTaskModal);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={classes.header}>
			<Logo />
			<div className={classes.buttonBar}>
				{showHeaderButtons && (
					<div
						className={`${classes.buttonContainer} ${classes.nonLastButton}`}
					>
						<button className={classes.button} onClick={toggleNewTaskModal}>
							New Task
						</button>
						<ModalContainer
							toggleModal={toggleNewTaskModal}
							modalState={showNewTaskModal}
							childModal={<NewTask toggleModal={toggleNewTaskModal} />}
						/>
					</div>
				)}
				<div className={classes.buttonContainer}>
					<button className={classes.button} onClick={onLogout}>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

const classes = {
	header:
		"w-full m-0 box-border p-3.5 bg-purple-600 text-white flex flex-row px-10 border-b-4 border-purple-800 justify-between",
	buttonBar: "flex flex-row gap-x-5 h-full my-auto text-lg",
	buttonContainer: "h-8 py-auto pr-0 border-white ",
	button: "h-full leading-none justify-end hover:opacity-60",
	nonLastButton: "pr-5 border-r-2",
};

export default Header;
