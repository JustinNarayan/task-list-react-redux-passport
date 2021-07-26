import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTasks } from "../../store/actions/taskActions";

import Task from "../utils/Task";

const Tasks = () => {
	const dispatch = useDispatch();
	const { tasks } = useSelector((state) => state.getTasks);

	useEffect(
		() => dispatch(getTasks()), // eslint-disable-next-line
		[]
	);

	/// Cache tasks on the page to prevent constant loading
	const [cachedTasks, setCachedTasks] = useState([]);
	useEffect(() => {
		if (tasks) {
			setCachedTasks(tasks);
		}
	}, [tasks]);

	return (
		<div>
			<br />
			{cachedTasks &&
				cachedTasks.length &&
				cachedTasks.map((task) => <Task key={task._id} task={task} />)}
			<br />
		</div>
	);
};

// const classes = {
// 	generalBox:
// 		"w-min mx-auto rounded-2xl border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow-md",
// 	loadingBox: "py-4 pl-3 pr-4",
// };

export default Tasks;
