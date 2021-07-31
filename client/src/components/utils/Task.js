import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	MdCheckBox,
	MdCheckBoxOutlineBlank,
	MdBuild,
	MdDelete,
} from "react-icons/md";

import { months, formattedDay } from "../../constants/datetimeConstants";

import { updateTask } from "../../store/actions/taskActions";

import Alerts from "../utils/Alerts";
import ModalContainer from "./ModalContainer";
import UpdateTask from "../views/UpdateTask";
import DeleteTask from "../views/DeleteTask";

const Task = ({ task: { _id, title, date, time, location, completed } }) => {
	const [localCompleted, setLocalCompleted] = useState(completed);

	const taskDate = new Date(date);

	const dispatch = useDispatch();
	const { notification } = useSelector((state) => state.updateTask);

	const onToggle = () => {
		setLocalCompleted(!completed);
		dispatch(updateTask(_id, { completed: !completed }));
	};

	const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
	const toggleUpdateTaskModal = () =>
		setShowUpdateTaskModal(!showUpdateTaskModal);

	const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
	const toggleDeleteTaskModal = () =>
		setShowDeleteTaskModal(!showDeleteTaskModal);

	const formatTime = () => {
		const [hour, minutes] = time.split(":");
		if (hour < 12) return `${hour}:${minutes} AM`;
		else if (hour === "12") return `${hour}:${minutes} PM`;
		else return `${hour - 12}:${minutes} PM`;
	};

	return (
		<>
			<ModalContainer
				toggleModal={toggleUpdateTaskModal}
				modalState={showUpdateTaskModal}
				childModal={
					<UpdateTask
						toggleModal={toggleUpdateTaskModal}
						task={{
							oldID: _id,
							oldTitle: title,
							oldDate: date,
							oldTime: time,
							oldLocation: location,
						}}
					/>
				}
			/>
			<ModalContainer
				toggleModal={toggleDeleteTaskModal}
				modalState={showDeleteTaskModal}
				childModal={
					<DeleteTask
						toggleModal={toggleDeleteTaskModal}
						task={{
							id: _id,
							title,
						}}
					/>
				}
			/>
			<div
				className={`${classes.taskCard} ${
					localCompleted ? classes.taskCompleted : classes.taskUncompleted
				}`}
			>
				{
					/* Only show alerts if there is an error message */
					notification &&
						notification.effectedTask === _id &&
						notification.err && (
							<Alerts extraClasses={classes.alerts} messages={[notification]} />
						)
				}
				<div className={classes.taskContents}>
					<div className={classes.checkContainer}>
						{localCompleted ? (
							<MdCheckBox
								size={52}
								className={classes.checkIcon}
								onClick={onToggle}
							/>
						) : (
							<MdCheckBoxOutlineBlank
								size={52}
								className={classes.checkIcon}
								onClick={onToggle}
							/>
						)}
					</div>
					<div className={classes.taskData}>
						<div className={classes.taskTitleBar}>
							<p className={classes.taskTitle}>{title}</p>
							<div className={classes.taskIcons}>
								<MdBuild
									size={32}
									className={classes.taskIcon}
									onClick={toggleUpdateTaskModal}
								/>
								<MdDelete
									size={32}
									className={classes.taskIcon}
									onClick={toggleDeleteTaskModal}
								/>
							</div>
						</div>
						<p className={classes.taskDate}>{`${
							months[taskDate.getMonth()]
						} ${formattedDay(
							taskDate.getDate()
						)}, ${taskDate.getFullYear()}`}</p>
						<p className={classes.taskTimeLocation}>
							{time ? formatTime() : ""}
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
		"flex flex-col w-96 sm:w-4/5 lg:w-3/4 mx-auto mb-6 rounded-2xl text-gray-700",
	taskUncompleted:
		"bg-white ring-4 ring-purple-200 ring-opacity-90 filter drop-shadow",
	taskCompleted: "bg-purple-200 ring-4 ring-white ring-opacity-90",
	taskContents: "flex px-2 pr-8 gap-x-2",
	alerts: "mt-5 -mb-1 w-10/12",
	checkContainer: "my-auto pr-3 pl-4",
	checkIcon: "text-purple-800 cursor-pointer",
	taskData: "py-3 w-full text-left flex flex-col",
	taskTitleBar:
		"text-purple-800 border-b-2 border-purple-800 mb-2 flex flex-row",
	taskTitle:
		"uppercase text-justify font-extrabold text-lg flex-initial w-full mr-4",
	taskIcons: "-mt-0.5 flex flex-row gap-x-2",
	taskIcon: "w-6 cursor-pointer",
	taskDate: "font-bold italic mb-1",
	taskTimeLocation: "font-norml italic mb-1",
};

export default Task;
