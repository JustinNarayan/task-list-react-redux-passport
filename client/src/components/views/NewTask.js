import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	MdClear,
	MdLabelOutline,
	MdAccessTime,
	MdLocationOn,
	MdAdd,
} from "react-icons/md";

import {
	createTask,
	clearTaskNotifications,
} from "../../store/actions/taskActions";

import Alerts from "../utils/Alerts";
import CustomInput from "../utils/forms/CustomInput";
import FullDateInput from "../utils/forms/FullDateInput";
import CustomSubmit from "../utils/forms/CustomSubmit";

const NewTask = ({ toggleModal }) => {
	/// Set component state variables
	const [title, setTitle] = useState("");
	const [day, setDay] = useState(1);
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [time, setTime] = useState("");
	const [includeTime, setIncludeTime] = useState(false);
	const [location, setLocation] = useState("");
	const [includeLocation, setIncludeLocation] = useState(false);
	const dispatch = useDispatch();

	const [messages, setMessages] = useState([]);

	/// Get global state values
	const { loading, notification } = useSelector((state) => state.createTask);
	const { notAuthenticated } = useSelector((state) => state.userAuth);

	/// Creating a new task
	const onSubmit = (e) => {
		e.preventDefault();

		/// Validation
		const validationErrors = [];
		if (!title)
			validationErrors.push({
				text: "Please title your task",
				type: "warning",
			});
		if (includeTime && !time)
			validationErrors.push({
				text: "Please input a valid time value",
				type: "warning",
			});

		/// Push errors to messages
		setMessages(validationErrors);
		if (validationErrors.length) return;

		/// Construct task object
		const newTask = {
			title,
			date: new Date(year, month - 1, day),
			time: includeTime && time ? time : "",
			location: includeLocation && location ? location : "",
		};

		// Attempt to create task
		dispatch(createTask(newTask));
	};

	/// Show notification upon global state change
	useEffect(() => {
		if (notification && notification.text) {
			setMessages([{ text: notification.text, type: notification.type }]);
		}
	}, [notification]);

	/// Handle modal closing
	const onClose = () => {
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
					<span className={classes.modalTitle}>Add New Task</span>
					<MdClear size={28} className={classes.modalClose} onClick={onClose} />
				</div>
				<Alerts extraClasses={classes.alerts} messages={messages} />
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					{/* Task Title */}
					<CustomInput
						IconElement={MdLabelOutline}
						inputLabel={"Title"}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{/* Task Date */}
					<FullDateInput
						onChanges={{
							setDayFunction: (e) => setDay(e.target.value),
							setMonthFunction: (e) => setMonth(e.target.value),
							setYearFunction: (e) => setYear(e.target.value),
						}}
						stateValues={{ month: month, year: year }}
					/>
					{/* Task Time - Optional */}
					<CustomInput
						IconElement={MdAccessTime}
						inputLabel="Time"
						inputType="time"
						onChange={(e) => setTime(e.target.value)}
						disabledState={!includeTime}
						hasIncludeCheckbox={true}
						includeFunction={(e) => setIncludeTime(e.target.checked)}
					/>
					{/* Task Location - Optional */}
					<CustomInput
						IconElement={MdLocationOn}
						inputLabel="Location"
						inputType="text"
						onChange={(e) => setLocation(e.target.value)}
						disabledState={!includeLocation}
						hasIncludeCheckbox={true}
						includeFunction={(e) => setIncludeLocation(e.target.checked)}
					/>
					<CustomSubmit loadingState={loading} IconElement={MdAdd} />
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
};

export default NewTask;
