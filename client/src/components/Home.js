import React from "react";

import AuthRedirect from "./utils/AuthRedirect";
import Tasks from "./views/Tasks";

const Home = () => {
	return (
		<div>
			<AuthRedirect />
			<br />
			<Tasks />
		</div>
	);
};

export default Home;
