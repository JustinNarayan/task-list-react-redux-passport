import React from "react";

const ModalContainer = ({ toggleModal, modalState, childModal }) => {
	return modalState ? (
		<div className={classes.modalBackground}>{childModal}</div>
	) : (
		<></>
	);
};

const classes = {
	modalBackground:
		"z-20 fixed bg-black bg-opacity-30 top-0 left-0 w-screen h-screen",
};

export default ModalContainer;
