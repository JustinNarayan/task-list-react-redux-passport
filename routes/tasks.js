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

		res.json(
			tasks.sort((a, b) => a.completed - b.completed || b.date - a.date)
		);
	} catch (err) {
		res.status(404).json({ text: errMessage, err });
	}
});

/**
 * Creates a new task for a given user
 * @POST /
 * @body title (string)
 * @body date (valid date string from Date(year, monthIndex, day) constructor)
 * @body time (valid time string hh:mm in 24 hour time)
 * @body location (string)
 *
 */

router.post("/", ensureAuthenticated, async (req, res) => {
	// Deconstruct request
	const { title, date, time, location } = req.body;

	// Track errors
	let errMessage;

	try {
		// Create task in database
		errMessage = "Failed to contact database";
		const task = new Task({
			title,
			date,
			time,
			location,
			completed: false,
			userID: req.user._id,
		});

		const createdTask = await task.save();

		// Send response
		res.status(201).json({
			text: "Successfully created task",
			type: "success",
			created: createdTask,
		});
	} catch (err) {
		res.json({ text: errMessage, err });
	}
});

/**
 * Edits the values of an existing task
 * @PUT /:id
 * @body title (string) [optional]
 * @body date (valid date string) [optional]
 * @body time (valid time string hh:mm am/pm) [optional]
 * @body location (string) [optional]
 * @body completed (boolean) [optional]
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

		// Send response
		res.json({
			text: "Successfully updated task",
			type: "success",
			updated: response,
			effectedTask: id,
		});
	} catch (err) {
		res.status(404).json({ text: errMessage, err, effectedTask: id });
	}
});

module.exports = router;
