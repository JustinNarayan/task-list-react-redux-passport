const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	userID: { type: String, required: true },
	title: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now() },
	time: { type: String, required: false, default: "12:00" },
	location: { type: String, required: false },
	completed: { type: Boolean, required: true, default: false },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
