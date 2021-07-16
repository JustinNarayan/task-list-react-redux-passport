import { combineReducers } from "redux";
import { userAuthReducer } from "./userReducer";

export default combineReducers({
	userAuth: userAuthReducer,
});
