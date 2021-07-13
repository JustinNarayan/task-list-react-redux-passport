import React from "react";
import { BrowserRouter } from "react-router-dom";

import Nav from "./components/Nav";
import Routing from "./components/Routing";

const App = () => {
	return (
		<BrowserRouter>
			<Nav />
			<Routing />
		</BrowserRouter>
	);
};

export default App;
