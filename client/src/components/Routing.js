import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../components/user/Login";

const Routing = () => {
	return (
		<div className={classes.screen}>
			<div className={classes.container}>
				<Switch>
					<Route path="/login" render={() => <Login />} />
				</Switch>
			</div>
		</div>
	);
};

const classes = {
	screen: "h-screen w-screen bg-purple-50 font-sans",
	container: "container mx-auto py-2 text-center",
};

export default Routing;
