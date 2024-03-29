const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const routeConfig = require("./routes/routes");
const cors = require("cors");
const MemoryStore = require("memorystore")(session);

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

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    resave: false,
    saveUninitialized: true,
    secret: "dogs",
  })
);

app.use(compression());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// Routes
app.use("/", routeConfig);

app.listen(process.env.PORT || 8080, () => console.log("app listening"));
module.exports = app;
