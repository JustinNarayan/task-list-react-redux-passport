const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Load User model
const User = require("../models/User");

module.exports = (passport) => {
	passport.use(
		new LocalStrategy((username, password, done) => {
			// Match user
			User.findOne({ username }).then((user) => {
				if (!user)
					return done(null, false, {
						message: "That username is not registered",
					});

				// Match password
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) return done(null, user);
					else return done(null, false, { message: "Password incorrect" });
				});
			});
		})
	);

	passport.serializeUser((user, done) => done(null, user._id));

	passport.deserializeUser((id, done) =>
		User.findById(id, (err, user) => done(err, user))
	);
};
