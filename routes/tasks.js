const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, (req, res) => {
	res.send([{ name: "Task 1" }, { name: "Task 2" }]);
});

module.exports = router;
