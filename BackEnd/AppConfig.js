const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const UserSchema = require("../../Schematics/User");
const PostSchema = require("../../Schematics/Post");

var helmet = require("helmet");
var compression = require("compression");

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

passport.use(
  new LocalStrategy((username, password, done) => {
    UserSchema.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Err" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserSchema.findById(id, function (err, user) {
    done(err, user);
  });
});

const app = express();
app.use(helmet());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
app.use(session({ secret: "dogs", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
// app.use("/public/stylesheets", express.static("./public/stylesheets"));
// app.use("/public/images/", express.static("./public/images"));
// app.use("/helperFunc/", express.static("./helperFunc"));
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// app.listen(8080, () => console.log("app listening on port 8080!"));
// module.exports = app;
