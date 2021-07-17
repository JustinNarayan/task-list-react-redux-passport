module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) return next();
		res.send({
			messages: "You are not logged in",
			type: "failure",
			notAuthenticated: true,
		});
	},
};
