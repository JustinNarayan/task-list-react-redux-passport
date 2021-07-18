const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
let keys;
try {
	keys = require("../config/keys");
} catch (err) {
	// module doesn't exist in production, use environmental variables
}

// Load User model
const User = require("../models/User");

/**
 * Returns the current user
 * @GET /current
 */
router.get("/current", (req, res) => {
	return res.json({ id: req.user._id, username: req.user.username });
});

/**
 * Register a new user
 * @POST /register
 * @body username (string)
 * @body password (string)
 */

router.post("/register", async (req, res) => {
	// Deconstruct request
	const { username, password } = req.body;

	// Track errors
	let errMessage;

	try {
		// Hash password
		errMessage = "Failed to hash password";
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.SALT, 10) || keys.salt
		);

		// Check if username is taken
		errMessage = "Failed to contact database";
		const existingUser = await User.findOne({ username: username });

		errMessage = "That username is taken";
		if (existingUser != null) throw errMessage;

		// Insert newly created user
		errMessage = "Failed to register user in database";
		await new User({ username, password: hashedPassword }).save();

		// Success
		res.status(201).send({
			text: "User successfully registered",
			type: "success",
		});
	} catch (caught) {
		// Send error message to front end
		res.send({ text: errMessage, err: caught });
	}
});

/**
 * Logs in a user
 * @POST /login
 * @body username (string)
 * @body password (string)
 */

router.post("/login", (req, res, next) => {
	// Track errors
	let errMessage;

	passport.authenticate("local", (err, user, info) => {
		try {
			errMessage = "Failed to attempt authentication";
			if (err) throw err;

			errMessage = "Invalid email or password";
			if (!user) throw info.message;

			req.login(user, (err) => {
				errMessage = "Failed to login";
				if (err) throw err;

				return res.json({
					text: "Successfully logged in",
					user: { id: req.user._id, username: req.user.username },
				});
			});
		} catch (err) {
			return res.json({ text: errMessage, err });
		}
	})(req, res, next);
});

/**
 * Logs out a user
 * @GET /logout
 */

router.get("/logout", (req, res) => {
	if (req.user) {
		req.logout();
		return res.json({ text: "Logged out" });
	} else {
		return res.json({ text: "No account to logout" });
	}
});
module.exports = router;
