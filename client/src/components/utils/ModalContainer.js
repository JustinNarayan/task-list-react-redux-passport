import React from "react";

const ModalContainer = ({ toggleModal, modalState, childModal }) => {
	return modalState ? (
		<div className={classes.modalBackground} onClick={toggleModal}>
			<div className={classes.modal}>
				<button className="w-64 h-50 bg-blue-200">Hello</button>
			</div>
		</div>
	) : (
		<></>
	);
};

const classes = {
	modalBackground:
		"z-30 fixed bg-black bg-opacity-30 top-0 left-0 w-screen h-screen",
	modal: "z-50",
};

export default ModalContainer;
