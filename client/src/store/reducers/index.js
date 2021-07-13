import { combineReducers } from "redux";
import { commentListReducer, commentAddReducer } from "./commentReducers";
import messageReducer from "./messageReducer";

export default combineReducers({
	commentList: commentListReducer,
	commentAdd: commentAddReducer,
	message: messageReducer,
});
