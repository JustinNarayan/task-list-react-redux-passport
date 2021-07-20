import React, { useState } from "react";
import {
	MdClear,
	MdLabelOutline,
	MdAccessTime,
	MdLocationOn,
} from "react-icons/md";

import CustomInput from "../utils/forms/CustomInput";
import FullDateInput from "../utils/forms/FullDateInput";

const NewTask = ({ toggleModal }) => {
	/// Set component state variables
	const [title, setTitle] = useState("");
	const [day, setDay] = useState(1);
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [time, setTime] = useState("");
	const [includeTime, setIncludeTime] = useState(false);
	const [location, setLocation] = useState("");
	const [includeLocation, setIncludeLocation] = useState(false);

	const onSubmit = (e) => e.preventDefault();

	return (
		<div className={classes.screen}>
			<div className={classes.modal}>
				<div className={classes.modalTitleBar}>
					<span className={classes.modalTitle}>Add New Task</span>
					<MdClear
						size={28}
						className={classes.modalClose}
						onClick={toggleModal}
					/>
				</div>
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					<CustomInput
						IconElement={MdLabelOutline}
						inputLabel={"Title"}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<FullDateInput
						onChanges={{
							setDayFunction: (e) => setDay(e.target.value),
							setMonthFunction: (e) => setMonth(e.target.value),
							setYearFunction: (e) => setYear(e.target.value),
						}}
						stateValues={{ month: month, year: year }}
					/>

					<CustomInput
						IconElement={MdAccessTime}
						inputLabel="Time"
						inputType="time"
						onChange={(e) => setTime(e.target.value)}
						disabledState={!includeTime}
						hasIncludeCheckbox={true}
						includeFunction={(e) => setIncludeTime(e.target.checked)}
					/>

					<CustomInput
						IconElement={MdLocationOn}
						inputLabel="Location"
						inputType="text"
						onChange={(e) => setLocation(e.target.value)}
						disabledState={!includeLocation}
						hasIncludeCheckbox={true}
						includeFunction={(e) => setIncludeLocation(e.target.checked)}
					/>
				</form>
			</div>
		</div>
	);
};

const classes = {
	screen: "w-screen z-40",
	modal:
		"flex flex-col w-88 sm:w-7/12 lg:w-160 mt-24 px-7 mx-auto py-4 text-center rounded-2xl border-4 border-purple-200 border-opacity-90 bg-white text-gray-700 filter drop-shadow",
	modalTitle:
		"block text-lg font-extrabold uppercase flex-initial w-full text-left",
	modalTitleBar:
		"text-purple-800 border-b-2 border-purple-800 flex flex-row mb-3",
	modalClose: "w-7 cursor-pointer",
	form: "mx-auto w-full",
};

export default NewTask;
