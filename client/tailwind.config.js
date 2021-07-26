module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				88: "22rem",
				160: "40rem",
				240: "60rem",
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ["disabled"],
			ringColor: ["hover", "disabled"],
			ringWidth: ["hover", "disabled"],
			cursor: ["disabled"],
		},
	},
	plugins: [require("@tailwindcss/custom-forms")],
};
