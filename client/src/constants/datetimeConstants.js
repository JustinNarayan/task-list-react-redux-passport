module.exports = {
	months: [
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
	],
	formattedDay: (dayOfMonth) => {
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
	},
	daysInMonth: (year, month) => {
		return parseInt(`${new Date(year, month, 0).getDate()}`);
	},
};
