/// Enable server
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

// Connect to MongoDB
const db = require("./config/keys").mongoURI;
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
		secret: require("./config/keys").sessionSecret,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser(require("./config/keys").sessionSecret));

// Passport config
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));

// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
