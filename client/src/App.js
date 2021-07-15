import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

import Routing from "./components/Routing";

const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routing />
			</Provider>
		</BrowserRouter>
	);
};

export default App;
