import React from "react";

import { MdDateRange, MdKeyboardArrowDown } from "react-icons/md";
import {
	months,
	formattedDay,
	daysInMonth,
} from "../../../constants/datetimeConstants";

const FullDateInput = ({
	onChanges: { setDayFunction, setMonthFunction, setYearFunction },
	stateValues: { month, year },
	inputIdentifier = "", // in case several date inputs have to be rendered
	defaultDayValue = null,
	defaultMonthValue = null,
	defaultYearValue = new Date().getFullYear(),
}) => {
	return (
		<div className={classes.wholeInput}>
			<label htmlFor="input-date" className={classes.formLabel}>
				<span className={classes.inputTitle}>Date</span>
			</label>
			<span className={classes.inputBox}>
				<MdDateRange size={22} className={classes.inputIcon} />
				<div className={classes.inputSet}>
					<div className={classes.selectContainer}>
						<select
							id={`input-day-${inputIdentifier}`}
							onChange={setDayFunction}
							className={classes.select}
							defaultValue={defaultDayValue}
						>
							{[...Array(daysInMonth(year, month))].map((nullValue, index) => (
								<option
									key={index}
									value={index + 1}
									className={classes.option}
								>
									{formattedDay(index + 1)}
								</option>
							))}
						</select>
						<MdKeyboardArrowDown className={classes.selectArrow} size={15} />
					</div>
					<div className={classes.selectContainer}>
						<select
							id={`input-month-${inputIdentifier}`}
							onChange={setMonthFunction}
							className={classes.select}
							defaultValue={defaultMonthValue}
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
						<MdKeyboardArrowDown className={classes.selectArrow} size={15} />
					</div>
					<input
						type="number"
						id={`input-year-${inputIdentifier}`}
						onChange={setYearFunction}
						className={classes.input}
						min={Math.min(new Date().getFullYear(), defaultYearValue)}
						defaultValue={defaultYearValue}
					/>
				</div>
			</span>
		</div>
	);
};

const classes = {
	wholeInput: "mb-4",
	formLabel: "block text-left pl-7 -mb-0.5",
	inputTitle: "text-sm font-light justify-left",
	inputBox: "flex flex-row justify-start -ml-0.5 mr-2.5 -pl-4",
	inputIcon: "mr-2 my-auto rounded-lg flex-initial",
	inputSet: "flex flex-row w-full gap-x-3",
	input:
		"disabled:bg-gray-100 py-0.5 block w-full px-1 outline-none border-0 border-b-2 border-gray-200 text-sm text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	select:
		"appearance-none py-0.5 block w-full px-1 outline-none border-0 border-b-2 border-gray-200 text-sm text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	selectContainer: "relative w-full px-0.5 block",
	selectArrow: "absolute right-0.5 top-1.5",
	option: "overflow-hidden w-4",
};

export default FullDateInput;
