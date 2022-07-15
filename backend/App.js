const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const routeConfig = require("./routes/routes");
const cors = require("cors");
const app = express();

// Connect To DB
dotenv.config();
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(
  mongoDb,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, client) => {
    if (err) {
      console.log(err);
      return;
    }
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(session({ secret: "dogs", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", routeConfig);

app.listen(8080, () => console.log("app listening on port 8080!"));
module.exports = app;
