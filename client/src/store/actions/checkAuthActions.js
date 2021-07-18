import { logout } from "./userActions";

const checkAuth = async (serverResponse, dispatch) => {
	if (serverResponse.notAuthenticated) {
		await dispatch(logout());
	}
};

export default checkAuth;
