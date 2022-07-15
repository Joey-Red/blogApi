const express = require("express");
// const app = require("../App");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../Schematics/User");
const Post = require("../Schematics/Post");
const LocalStrategy = require("passport-local").Strategy;

// Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      // console.log(user);

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
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
router.use(passport.initialize());
router.use(passport.session());

// router.use(function (req, res, next) {
//   res.locals.currentUser = req.user;
//   next();
// });

// Create Post
router.post("/create-post", (req, res, next) => {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
    user: req.body.username,
    // !!!This is proper^ but had to change for testing
    // user: req.body.username,
    // !!^ For testing route
    added: new Date(),
  }).save((err) => {
    if (err) {
      return next(err);
    }
    // res.redirect("/");
    // res.json(post);
  });
});

// Sign Up to comment || Comment as Anon?
router.post("/sign-up", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      // need to make if admin: admin password
      isAdmin: req.body.isAdmin,
    }).save((err) => {
      if (err) {
        return next(err);
      }
    });
    // res.send(req.body.username + " Created");
  });
});

// router.post("/secret", async (req, res) => {
//   if (req.body.secret === `${process.env.SECRET_WORD}`) {
//     const doc = await User.findOne(req.user);
//     doc.isMember = true;
//     await doc.save();
//     res.redirect("/");
//   } else {
//     console.log("Failure");
//     res.redirect("/");
//   }
// });

//Delete Post and Refresh Page
// router.post("/", (req, res) => {
//   Post.findByIdAndRemove(req.body.deleteMessage, function deleteMessage(err) {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

// GET Sign Up Page
// router.get("/sign-up", (req, res) => res.render("sign-up-form"));

//GET Create Post Page
// router.get("/create-post", (req, res) => {
//   if (req.user) {
//     res.render("create-post-form", { user: req.user });
//   } else {
//     res.redirect("/");
//   }
// });

// "GET" Log out page (log out and go home)
// Not sure exactly how to test this one w/o act logging in
router.get("/log-out", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect("/");
    res.send("logged out");
  });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
  function (req, res) {
    if (req.user) {
      res.send(req.user.username);
    } else {
      res.json(err);
    }
  }
);
router.get("/getPosts", (req, res) => {
  Post.find({}, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result);
  });
});
router.get("/getUsers", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result);
  });
});
router.get("/", function (req, res) {
  res.send("Hello world");
});

module.exports = router;
