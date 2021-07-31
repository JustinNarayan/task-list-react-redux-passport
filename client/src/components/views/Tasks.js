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
			{cachedTasks && cachedTasks.length
				? cachedTasks.map((task) => <Task key={task._id} task={task} />)
				: ""}
			<br />
		</div>
	);
};

export default Tasks;
