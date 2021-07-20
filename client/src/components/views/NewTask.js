import React, { useState } from "react";
import {
	MdClear,
	MdLabelOutline,
	MdAccessTime,
	MdLocationOn,
	MdDateRange,
	MdKeyboardArrowDown,
} from "react-icons/md";

const NewTask = ({ toggleModal }) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const formattedDay = (dayOfMonth) => {
		switch (dayOfMonth % 10) {
			case 1:
				return dayOfMonth + "st";
			case 2:
				return dayOfMonth + "nd";
			case 3:
				return dayOfMonth + "rd";
			default:
				return dayOfMonth + "th";
		}
	};
	const daysInMonth = () => {
		return parseInt(`${new Date(year, month, 0).getDate()}`);
	};

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
					<div className={classes.wholeInput}>
						<label htmlFor="input-title" className={classes.formLabel}>
							<span className={classes.inputTitle}>Title</span>
						</label>
						<span className={classes.inputBox}>
							<MdLabelOutline size={22} className={classes.inputIcon} />
							<input
								type="text"
								id="input-title"
								onChange={(e) => setTitle(e.target.value)}
								className={classes.input}
							/>
						</span>
					</div>
					<div className={classes.wholeInput}>
						<label htmlFor="input-date" className={classes.formLabel}>
							<span className={classes.inputTitle}>Date</span>
						</label>
						<span className={classes.inputBox}>
							<MdDateRange size={22} className={classes.inputIcon} />
							<div className={classes.inputSet}>
								<div className={classes.selectContainer}>
									<select
										id="input-day"
										onChange={(e) => setDay(e.target.value)}
										className={classes.select}
										placeholder="Day"
									>
										{[...Array(daysInMonth())].map((nullValue, index) => (
											<option
												key={index}
												value={index + 1}
												className={classes.option}
											>
												{formattedDay(index + 1)}
											</option>
										))}
									</select>
									<MdKeyboardArrowDown
										className={classes.selectArrow}
										size={15}
									/>
								</div>
								<div className={classes.selectContainer}>
									<select
										id="input-month"
										onChange={(e) => setMonth(e.target.value)}
										className={classes.select}
										placeholder="Month"
									>
										{[...Array(months.length)].map((nullValue, index) => (
											<option
												key={index}
												value={index + 1}
												className={classes.option}
											>
												{months[index]}
											</option>
										))}
									</select>
									<MdKeyboardArrowDown
										className={classes.selectArrow}
										size={15}
									/>
								</div>
								<input
									type="number"
									id="input-year"
									onChange={(e) => setYear(e.target.value)}
									className={classes.input}
									placeholder="Year"
									min={new Date().getFullYear()}
									defaultValue={new Date().getFullYear()}
								/>
							</div>
						</span>
					</div>

					<div className={classes.wholeInput}>
						<label htmlFor="input-time" className={classes.formLabel}>
							<span className={classes.inputTitle}>Time</span>
						</label>
						<span className={classes.inputBox}>
							<MdAccessTime size={22} className={classes.inputIcon} />
							<div className={classes.optionalInputs}>
								<input
									type="time"
									id="input-time"
									onChange={(e) => setTime(e.target.value)}
									className={classes.input}
									disabled={!includeTime}
								/>
								<div className={classes.checkboxContainer}>
									<input
										type="checkbox"
										id="includeTime"
										className={classes.checkbox}
										defaultChecked={false}
										onChange={(e) => setIncludeTime(e.target.checked)}
									/>
									<label className={classes.include} htmlFor="includeTime">
										Include?
									</label>
								</div>
							</div>
						</span>
					</div>

					<div className={classes.wholeInput}>
						<label htmlFor="input-location" className={classes.formLabel}>
							<span className={classes.inputTitle}>Location</span>
						</label>
						<span className={classes.inputBox}>
							<MdLocationOn size={22} className={classes.inputIcon} />
							<div className={classes.optionalInputs}>
								<input
									type="text"
									id="input-location"
									onChange={(e) => setLocation(e.target.value)}
									className={classes.input}
									disabled={!includeLocation}
								/>
								<div className={classes.checkboxContainer}>
									<input
										type="checkbox"
										id="includeLocation"
										className={classes.checkbox}
										defaultChecked={false}
										onChange={(e) => setIncludeLocation(e.target.checked)}
									/>
									<label className={classes.include} htmlFor="includeLocation">
										Include?
									</label>
								</div>
							</div>
						</span>
					</div>
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
	wholeInput: "mb-4",
	formLabel: "block text-left pl-7 -mb-0.5",
	inputTitle: "text-sm font-light justify-left",
	inputBox: "flex flex-row justify-start -ml-0.5 mr-2.5 -pl-4",
	inputIcon: "mr-1.5 my-auto rounded-lg flex-initial",
	inputSet: "flex flex-row w-full gap-x-3",
	input:
		"disabled:bg-gray-100 py-0.5 block w-full px-1 outline-none border-0 border-b-2 border-gray-200 text-sm text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	select:
		"appearance-none py-0.5 block w-full px-1 outline-none border-0 border-b-2 border-gray-200 text-sm text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	selectContainer: "relative w-full px-0.5 block",
	selectArrow: "absolute right-0.5 top-1.5",
	option: "overflow-hidden w-4",
	optionalInputs: "inline-flex flex-row gap-x-8 select-none w-full",
	include: "text-sm my-auto italic",
	checkboxContainer: "inline-flex gap-x-1.5",
	checkbox:
		"form-checkbox rounded-md border-2 border-gray-300 my-auto w-4.5 h-4.5",
};

export default NewTask;
