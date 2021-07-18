import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTasks } from "../../store/actions/taskActions";

import LoadingSpinner from "../utils/LoadingSpinner";

const Tasks = () => {
	const dispatch = useDispatch();
	const { loading, tasks } = useSelector((state) => state.getTasks);

	useEffect(() => dispatch(getTasks()), []);

	return (
		<div>
			{loading ? (
				<div className={`${classes.generalBox} ${classes.loadingBox}`}>
					<LoadingSpinner />
				</div>
			) : (
				<></>
			)}
			<br />
			Tasks {JSON.stringify(tasks)}
			<br />
		</div>
	);
};

const classes = {
	generalBox:
		"w-min mx-auto rounded-2xl border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow-md",
	loadingBox: "py-4 pl-3 pr-4",
};

export default Tasks;
