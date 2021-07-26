import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	MdClear,
	MdLabelOutline,
	MdAccessTime,
	MdLocationOn,
	MdBuild,
} from "react-icons/md";

import {
	updateTask,
	clearTaskNotifications,
} from "../../store/actions/taskActions";

import Alerts from "../utils/Alerts";
import CustomInput from "../utils/forms/CustomInput";
import FullDateInput from "../utils/forms/FullDateInput";
import CustomSubmit from "../utils/forms/CustomSubmit";

const UpdateTask = ({
	toggleModal,
	task: { oldID, oldTitle, oldDate, oldTime, oldLocation },
}) => {
	/// Set component state variables
	const [title, setTitle] = useState(oldTitle);

	const [destructuredYear, destructuredMonth, destructuredDay] = oldDate
		.substring(0, 10)
		.split("-");
	const paddedTime = oldTime.padStart(5, "0"); // ensures hh:mm format

	const [day, setDay] = useState(destructuredDay);
	const [month, setMonth] = useState(destructuredMonth);
	const [year, setYear] = useState(destructuredYear);
	const [time, setTime] = useState(paddedTime);
	const [includeTime, setIncludeTime] = useState(oldTime != "");
	const [location, setLocation] = useState(oldLocation);
	const [includeLocation, setIncludeLocation] = useState(oldLocation != "");
	const dispatch = useDispatch();

	const [messages, setMessages] = useState([]);

	const [hasChangedAttributes, setHasChangedAttributes] = useState(false);

	/// Get global state values
	const { loading, notification } = useSelector((state) => state.updateTask);
	const { notAuthenticated } = useSelector((state) => state.userAuth);

	/// Update a task
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

		/// Construct updated parameters
		const updatedParameters = {
			title,
			date: new Date(year, month - 1, day),
			time: includeTime && time !== "00000" ? time : "",
			location: includeLocation && location != "" ? location : "",
		};

		// Attempt to create task
		dispatch(updateTask({ id: oldID, updatedParameters }));
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

	/// Detect if changes are made
	useEffect(() => {
		if (
			title === oldTitle &&
			day === destructuredDay &&
			month === destructuredMonth &&
			year === destructuredYear &&
			includeTime == (oldTime != "") &&
			((includeTime && oldTime === time) || !includeTime) &&
			includeLocation == (oldLocation != "") &&
			location === oldLocation
		)
			setHasChangedAttributes(false);
		else setHasChangedAttributes(true);
	}, [title, day, month, year, time, includeTime, location, includeLocation]);

	return (
		<div className={classes.screen}>
			<div className={classes.modal}>
				<div className={classes.modalTitleBar}>
					<span className={classes.modalTitle}>Update Task</span>
					<MdClear size={28} className={classes.modalClose} onClick={onClose} />
				</div>
				<Alerts extraClasses={classes.alerts} messages={messages} />
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					{/* Task Title */}
					<CustomInput
						IconElement={MdLabelOutline}
						inputLabel={"Title"}
						onChange={(e) => setTitle(e.target.value)}
						inputOptionsObject={{ defaultValue: oldTitle }}
					/>
					{/* Task Date */}
					<FullDateInput
						onChanges={{
							setDayFunction: (e) => setDay(e.target.value),
							setMonthFunction: (e) => setMonth(e.target.value),
							setYearFunction: (e) => setYear(e.target.value),
						}}
						stateValues={{ month: month, year: year }}
						defaultDayValue={destructuredDay}
						defaultMonthValue={destructuredMonth}
						defaultYearValue={destructuredYear}
					/>
					{/* Task Time - Optional */}
					<CustomInput
						IconElement={MdAccessTime}
						inputLabel="Time"
						inputType="time"
						onChange={(e) => setTime(e.target.value)}
						disabledState={!includeTime}
						hasIncludeCheckbox={true}
						defaultChecked={includeTime}
						includeFunction={(e) => setIncludeTime(e.target.checked)}
						inputOptionsObject={{ defaultValue: paddedTime }}
					/>
					{/* Task Location - Optional */}
					<CustomInput
						IconElement={MdLocationOn}
						inputLabel="Location"
						inputType="text"
						onChange={(e) => setLocation(e.target.value)}
						disabledState={!includeLocation}
						hasIncludeCheckbox={true}
						defaultChecked={includeLocation}
						includeFunction={(e) => setIncludeLocation(e.target.checked)}
						inputOptionsObject={{ defaultValue: oldLocation }}
					/>
					<CustomSubmit
						loadingState={loading}
						additionalDisabledState={!hasChangedAttributes}
						IconElement={MdBuild}
					/>
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

export default UpdateTask;
