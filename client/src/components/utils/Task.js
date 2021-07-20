import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdSettings } from "react-icons/md";

import { updateTask } from "../../store/actions/taskActions";

import Alerts from "../utils/Alerts";

const Task = ({ task: { _id, title, date, time, location, completed } }) => {
	const [localCompleted, setLocalCompleted] = useState(completed);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const formattedDay = (dayOfMonth) => {
		switch (dayOfMonth % 10) {
			case 1:
				return dayOfMonth + "st";
			case 2:
				return dayOfMonth + "nd";
			case 3:
				return dayOfMonth + "rd";
			default:
				return dayOfMonth + "th";
		}
	};
	const taskDate = new Date(date);

	const dispatch = useDispatch();
	const { notification } = useSelector((state) => state.updateTask);

	const onToggle = () => {
		setLocalCompleted(!completed);
		dispatch(
			updateTask({ id: _id, updatedParameters: { completed: !completed } })
		);
	};

	return (
		<>
			<div className={classes.taskCard}>
				{
					/* Only show alerts if there is an error message */
					notification &&
						notification.effectedTask === _id &&
						notification.err && (
							<Alerts extraClasses={classes.alerts} messages={[notification]} />
						)
				}
				<div className={classes.taskContents}>
					{localCompleted ? (
						<MdCheckBox
							size={92}
							className={classes.checkIcon}
							onClick={onToggle}
						/>
					) : (
						<MdCheckBoxOutlineBlank
							size={92}
							className={classes.checkIcon}
							onClick={onToggle}
						/>
					)}
					<div className={classes.taskData}>
						<div className={classes.taskTitleBar}>
							<p className={classes.taskTitle}>{title}</p>
							<MdSettings size={32} className={classes.taskSettings} />
						</div>
						<p className={classes.taskDate}>{`${
							months[taskDate.getMonth()]
						} ${formattedDay(
							taskDate.getDate()
						)}, ${taskDate.getFullYear()}`}</p>
						<p className={classes.taskTimeLocation}>
							{time ? `${time}` : ""}
							{location
								? time && location
									? ` at ${location}`
									: `At ${location}`
								: ""}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

const classes = {
	taskCard:
		"flex flex-col w-96 sm:w-4/5 lg:w-3/4 mx-auto rounded-2xl border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow",
	taskContents: "flex px-2 pr-8 gap-x-2",
	alerts: "mt-5 -mb-1 w-10/12",
	checkIcon: "text-purple-800 my-auto px-4",
	taskData: "py-3 w-full text-left flex flex-col",
	taskTitleBar:
		"text-purple-800 border-b-2 border-purple-800 mb-2 flex flex-row",
	taskTitle:
		"uppercase text-justify font-extrabold text-lg flex-initial w-full mr-4",
	taskSettings: "w-6 -mt-0.5",
	taskDate: "font-bold italic mb-1",
	taskTimeLocation: "font-norml italic mb-1",
};

export default Task;
