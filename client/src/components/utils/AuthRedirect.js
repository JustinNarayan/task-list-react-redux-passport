import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirect = () => {
	const { notAuthenticated } = useSelector((state) => state.userAuth);

	return <>{notAuthenticated && <Redirect to="/loggedout" />}</>;
};

export default AuthRedirect;
