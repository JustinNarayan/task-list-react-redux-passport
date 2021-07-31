import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClear, MdDelete } from "react-icons/md";

import {
	deleteTask,
	clearTaskNotifications,
} from "../../store/actions/taskActions";

import Alerts from "../utils/Alerts";
import CustomSubmit from "../utils/forms/CustomSubmit";

const DeleteTask = ({ toggleModal, task: { id, title } }) => {
	const dispatch = useDispatch();

	const [messages, setMessages] = useState([]);

	/// Get global state values
	const { loading, notification } = useSelector((state) => state.deleteTask);
	const { notAuthenticated } = useSelector((state) => state.userAuth);

	/// Delete a Task
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteTask(id));
	};

	/// Show notification upon global state change
	useEffect(() => {
		if (notification && notification.text) {
			setMessages([{ text: notification.text, type: notification.type }]);
		}
	}, [notification]);

	/// Handle modal closing
	const onClose = async () => {
		setMessages([]);
		dispatch(clearTaskNotifications());
		toggleModal();
	};

	/// Close modal upon component unmounting from inadvertant logout
	useEffect(() => {
		if (notAuthenticated) onClose();
	}, [notAuthenticated]);

	return (
		<div className={classes.screen}>
			<div className={classes.modal}>
				<div className={classes.modalTitleBar}>
					<span className={classes.modalTitle}>Delete Task</span>
					<MdClear size={28} className={classes.modalClose} onClick={onClose} />
				</div>
				<Alerts extraClasses={classes.alerts} messages={messages} />
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					<div className={classes.confirm}>
						<p className={classes.confirmAsk}>
							Are you sure you want to delete your task:
						</p>
						<span className={classes.confirmTask}>{title}</span>
					</div>
					<CustomSubmit loadingState={loading} IconElement={MdDelete} />
				</form>
			</div>
		</div>
	);
};

const classes = {
	screen: "w-screen z-40",
	modal:
		"flex flex-col w-88 sm:w-7/12 lg:w-160 mt-24 px-7 mx-auto py-4 text-center rounded-2xl border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow",
	modalTitle:
		"block text-lg font-extrabold uppercase flex-initial w-full text-left",
	modalTitleBar:
		"text-purple-800 border-b-2 border-purple-800 flex flex-row mb-2",
	modalClose: "w-7 cursor-pointer",
	alerts: "w-11/12 mb-2",
	form: "mx-auto w-full",
	confirm: "text-base font-semibold italic",
	confirmAsk: "mb-2",
	confirmTask:
		"uppercase text-base text-purple-800 font-extrabold not-italic mt-2 border-b border-purple-800",
};

export default DeleteTask;
