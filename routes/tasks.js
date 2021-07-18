const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { ensureAuthenticated } = require("../config/auth");

// Load Task model
const Task = require("../models/Task");

/**
 * Retrieves all a user's tasks from the database
 * @GET /
 */

router.get("/", ensureAuthenticated, async (req, res) => {
	// Track errors
	let errMessage;

	try {
		// Retrieve tasks from database
		errMessage = "Failed to contact database";
		const tasks = await Task.find({ userID: req.user._id });
		res.json(tasks);
	} catch (err) {
		res.json({ text: errMessage, err });
	}
});

/**
 * Edits the values of an existing task
 * @PUT /:id
 *
 */
router.put("/:id", ensureAuthenticated, async (req, res) => {
	// Deconstruct request
	const { id } = req.params;

	// Track errors
	let errMessage;

	try {
		// Update in database
		errMessage = "Failed to contact database";
		const response = await Task.findOneAndUpdate(
			{
				userID: req.user._id,
				_id: ObjectId(id),
			},
			{ ...req.body }, // changes only the categories that are sent in the request
			{
				new: true, // returns the updated document
				upsert: true, // inserts fields if they are not initially present for some reason
				useFindAndModify: false, // deprecation
			}
		);
		res.json({
			text: "Successfully updated task",
			type: "success",
			updated: response,
			effectedTask: id,
		});
	} catch (err) {
		res.json({ text: errMessage, err, effectedTask: id });
	}
});

module.exports = router;
