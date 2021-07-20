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
		},
	},
	plugins: [require("@tailwindcss/custom-forms")],
};
