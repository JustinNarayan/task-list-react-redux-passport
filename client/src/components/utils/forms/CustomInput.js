import React from "react";

const CustomInput = ({
	IconElement = null,
	inputLabel,
	inputType = "text",
	onChange,
	inputOptionsObject = {},
	disabledState = false,
	hasIncludeCheckbox = false,
	includeFunction = () => {},
}) => {
	return (
		<div className={classes.wholeInput}>
			<label htmlFor={inputLabel} className={classes.formLabel}>
				<span className={classes.inputTitle}>{inputLabel}</span>
			</label>
			<span className={classes.inputBox}>
				{IconElement ? (
					<IconElement size={22} className={classes.inputIcon} />
				) : (
					<div className={classes.emptyIcon}>{"x"}</div>
				)}
				<div className={classes.inputRow}>
					<input
						type={inputType}
						id={inputLabel}
						onChange={onChange}
						className={classes.input}
						disabled={disabledState}
						{...inputOptionsObject}
					/>
					{hasIncludeCheckbox && (
						<div className={classes.checkboxContainer}>
							<input
								type="checkbox"
								id={`include${inputLabel}`}
								className={classes.checkbox}
								defaultChecked={false}
								onChange={includeFunction}
							/>
							<label
								className={classes.include}
								htmlFor={`include${inputLabel}`}
							>
								Include?
							</label>
						</div>
					)}
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
	inputIcon: "mr-1.5 my-auto rounded-lg flex-initial",
	emptyIcon: "mr-5 text-base select-none text-white",
	input:
		"disabled:bg-gray-100 py-0.5 block w-full px-1 outline-none border-0 border-b-2 border-gray-200 text-sm text-gray-700 focus:ring-0 focus:border-black focus:bg-purple-50 font-normal",
	inputRow: "inline-flex flex-row gap-x-8 select-none w-full",
	include: "text-sm my-auto italic",
	checkboxContainer: "inline-flex gap-x-1.5",
	checkbox:
		"form-checkbox rounded-md border-2 border-gray-300 my-auto w-4.5 h-4.5",
};

export default CustomInput;
