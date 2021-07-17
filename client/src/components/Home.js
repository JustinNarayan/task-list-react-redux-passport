import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../store/actions/userActions";
import axios from "axios";

const Home = () => {
	const [tasks, setTasks] = useState([]);

	const dispatch = useDispatch();

	const onGetUser = () => {
		dispatch(getUser());
	};

	const onTasks = async () => {
		const { data } = await axios.get(`http://localhost:5000/api/tasks`);
		setTasks(data);

		if (data.notAuthenticated) alert("not authed");
	};

	return (
		<div>
			<button onClick={onGetUser}>Click to get user</button>
			<br />
			<button onClick={onTasks}>
				Click to get tasks: {JSON.stringify(tasks)}
			</button>
		</div>
	);
};

export default Home;
