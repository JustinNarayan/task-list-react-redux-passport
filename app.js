/// Enable server
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

// Connect to MongoDB
const db = process.env.mongoURI || require("./config/keys").mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

// App and middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000", // React app location
		credentials: true,
	})
);

// Express session
app.use(
	session({
		secret: process.env.SESSIONSECRET || require("./config/keys").sessionSecret,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(
	cookieParser(
		process.env.SESSIONSECRET || require("./config/keys").sessionSecret
	)
);

// Passport config
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
