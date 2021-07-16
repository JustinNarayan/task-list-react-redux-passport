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

// Current User
router.get("/current", (req, res) => {
	res.send(req.user);
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
		if (existingUser != null) throw "";

		// Insert newly created user
		errMessage = "Failed to register user in database";
		await new User({ username, password: hashedPassword }).save();

		// Success
		res.status(201).send({
			message: "User successfully registered - SHOULD REDIRECT TO LOGIN",
			type: "success",
		});
	} catch (err) {
		// Send error message to front end
		res.send({ text: errMessage, err });
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

	passport.authenticate("local", (err, user) => {
		try {
			// Check for authentication errors
			errMessage = "Failed to attempt authentication";
			if (err) throw err;

			// Check for credentials
			errMessage = "Invalid login credentials";
			if (!user) throw "";
			else {
				// Attempt login
				req.logIn(user, (err) => {
					errMessage = "Failed to login";
					if (err) throw err;

					return res.send(user);
				});
			}
		} catch (err) {
			res.send({ text: errMessage, err });
		}
	})(req, res, next);
});

/**
 * Logs out a user
 * @GET /logout
 */

router.get("/logout", (req, res) => {
	req.logout();
	res.send({
		messages: "Successfully logged out - SHOULD REDIRECT TO LOGIN",
		type: "success",
	});
});

module.exports = router;
