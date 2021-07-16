import React, { useState, useRef } from "react";
import { HiCheckCircle, HiXCircle, HiExclamationCircle } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

const Alert = ({ text, type }) => {
	const alertTimeout = 400;
	const transitionRef = useRef(null);
	const [showAlert, setShowAlert] = useState(true);

	const getAlert = () => {
		switch (type) {
			case "success":
				return (
					<div
						ref={transitionRef}
						className={`${classes.alertBox} ${classes.successBox} ${
							showAlert ? "" : classes.hidden
						}`}
					>
						<HiCheckCircle size={16} className={classes.icon} />
						<p className={`${classes.message} ${classes.successMessage}`}>
							{text}
						</p>
						<button
							className={classes.closeButton}
							onClick={() => setShowAlert(false)}
						>
							<MdClose
								size={18}
								className={`${classes.closeIcon} ${classes.closeIconSuccess}`}
							/>
						</button>
					</div>
				);
			case "warning":
				return (
					<div
						ref={transitionRef}
						className={`${classes.alertBox} ${classes.warningBox} ${
							showAlert ? "" : classes.hidden
						}`}
					>
						<HiExclamationCircle size={18} className={classes.icon} />
						<p className={`${classes.message} ${classes.warningMessage}`}>
							{text}
						</p>
						<button
							className={classes.closeButton}
							onClick={() => setShowAlert(false)}
						>
							<MdClose
								size={18}
								className={`${classes.closeIcon} ${classes.closeIconWarning}`}
							/>
						</button>
					</div>
				);
			default:
				return (
					<div
						ref={transitionRef}
						className={`${classes.alertBox} ${classes.failureBox} ${
							showAlert ? "" : classes.hidden
						}`}
					>
						<HiXCircle size={18} className={classes.icon} />
						<p className={`${classes.message} ${classes.failureMessage}`}>
							{text}
						</p>
						<button
							className={classes.closeButton}
							onClick={() => setShowAlert(false)}
						>
							<MdClose
								size={18}
								className={`${classes.closeIcon} ${classes.closeIconFailure}`}
							/>
						</button>
					</div>
				);
		}
	};

	return (
		<CSSTransition
			in={showAlert}
			timeout={alertTimeout}
			classNames={"opacity"}
			nodeRef={transitionRef}
			unmountOnExit
		>
			{getAlert()}
		</CSSTransition>
	);
};

const classes = {
	alertBox:
		"w-full rounded-sm py-2.5 px-3 text-sm flex flex-row flex gap-x-2 font-normal pl-2 border-l-4 mb-2 last:mb-0 transition-opacity duration-300",
	hidden: "opacity-0",
	successBox: "bg-green-100 border-green-600 text-green-600",
	failureBox: "bg-red-100 border-red-600 text-red-600",
	warningBox: "bg-yellow-100 border-yellow-600 text-yellow-600",
	icon: "my-auto mt-0.5 w-6 hidden lg:block",
	message: "text-left w-full",
	closeButton: "mr-0",
	closeIcon: "my-auto",
	closeIconSuccess: "text-green-600",
	closeIconFailure: "text-red-600",
	closeIconWarning: "text-yellow-600",
};

export default Alert;
