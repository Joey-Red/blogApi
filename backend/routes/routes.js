const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../Schematics/User");
const Post = require("../Schematics/Post");
const Comment = require("../Schematics/Comment");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const dotenv = require("dotenv");
dotenv.config();

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
// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.SECRET_KEY,
//     },
//     function (jwtPayload, cb) {
//       console.log("peepo", jwtPayload, cb);
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       return UserModel.findOneById(jwtPayload.id)
//         .then((user) => {
//           return cb(null, user);
//         })
//         .catch((err) => {
//           return cb(err);
//         });
//     }
//   )
// );

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
router.use(passport.initialize());
// router.use(passport.session());

// router.use(function (req, res, next) {
//   res.locals.currentUser = req.user;
//   next();
// });

// Create Post
router.post("/create-post", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const post = new Post({
        title: req.body.postTitle,
        body: req.body.postBody,
        user: req.body.username,
        publish: req.body.publishStatus,
        added: new Date(),
      }).save((err) => {
        if (err) {
          return next(err);
        }
        // res.redirect("/");
        // res.json({ authData: authData });
      });
    }
  });
});

// Create Post
router.post("/comment", (req, res, next) => {
  const comment = new Comment({
    commentingOnId: req.body.commentingOnId,
    username: req.body.username,
    title: req.body.title,
    body: req.body.body,
    added: new Date(),
  });
  Post.findOneAndUpdate(
    { _id: req.body.commentingOnId },
    {
      $push: { comments: comment },
    },
    { upsert: true },
    function (err, docs) {
      res.json(docs);
    }
  );
});
// Set Post to Publish
router.post("/publishPost", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      publish: true,
    },
    // { upsert: true },
    function (err, docs) {
      res.json(docs);
    }
  );
});
// Set Post to UNPublish
router.post("/unpublishPost", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      publish: false,
    },
    // { upsert: true },
    function (err, docs) {
      res.json(docs);
    }
  );
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
router.post("/deletePost", (req, res, next) => {
  Post.findByIdAndRemove(req.body.postId, function deleteMessage(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
router.post("/editPost", (req, res, next) => {
  const updatedPost = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  Object.keys(updatedPost).forEach(
    (k) => updatedPost[k] == "" && delete updatedPost[k]
  );
  Post.findByIdAndUpdate(
    req.body.updateId,
    updatedPost,
    function updateMessage(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    }
  );
});

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

// router.post(
//   "/log-in",
//   passport.authenticate("local", {
//     // failureRedirect: "/log-in",
//     // failureMessage: true,
//   }),
//   function (req, res) {
//     if (req.user) {
//       jwt.sign({ user: req.user }, process.env.SECRET_KEY, (err, token) => {
//         res.json({
//           token: token,
//         });
//       });
//       res.send(req.user.username);
//     } else {
//       res.json(err);
//     }
//   }
// );
router.post("/log-in", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "1200s",
      });
      // console.log(token);
      return res.json({ user, token });
    });
  })(req, res);
});
// Authorization: Bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    //Call next
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
router.get("/getPosts", (req, res) => {
  Post.find({ publish: true }, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result);
  });
});
router.get("/adminPosts", verifyToken, (req, res) => {
  console.log(req.token);
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      // res.json(403); <-- Crashes app
      console.log(err);
    }
    //  publish: false if you want only false inside {}
    Post.find({ publish: false }, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
  });
});
router.get("/adminPostsPublished", verifyToken, (req, res) => {
  console.log(req.token);
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      // res.json(403); <-- Crashes app
      console.log(err);
    }
    Post.find({ publish: true }, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
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
router.get("/getReplies", (req, res) => {
  Comment.find({}, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result);
  });
});
router.get("/", function (req, res) {
  // res.send("Hello world");
});

module.exports = router;
