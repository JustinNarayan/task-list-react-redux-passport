import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import CommentList from "./CommentList";
import Compose from "./Compose";

const Routing = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" render={() => <Home />} />
				<Route exact path="/comments" render={() => <CommentList />} />
				<Route exact path="/compose" render={() => <Compose />} />
			</Switch>
		</>
	);
};

export default Routing;
