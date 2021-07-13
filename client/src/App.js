import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import "./App.css";

import Nav from "./components/Nav";
import Messages from "./components/Messages";
import Routing from "./components/Routing";

const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Nav />
				<Messages />
				<Routing />
			</Provider>
		</BrowserRouter>
	);
};

export default App;
