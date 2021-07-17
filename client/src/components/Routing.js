import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./layout/Header";
import User from "./User";
import Home from "./Home";

const Routing = () => {
	return (
		<div className={classes.screen}>
			<Header />
			<div className={classes.container}>
				<Switch>
					<Route path="/login" render={() => <User mode="login" />} />
					<Route path="/register" render={() => <User mode="register" />} />

					<Route path="/" exact render={() => <Home />} />
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
