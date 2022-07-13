app.post("/create-post", (req, res, next) => {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
    user: req.user.username,
    added: new Date(),
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/secret", async (req, res) => {
  if (req.body.secret === `${process.env.SECRET_WORD}`) {
    const doc = await User.findOne(req.user);
    doc.isMember = true;
    await doc.save();
    res.redirect("/");
  } else {
    console.log("Failure");
    res.redirect("/");
  }
});

app.post("/sign-up", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      isMember: false,
      isAdmin: req.body.isAdmin,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.post("/", (req, res) => {
  Post.findByIdAndRemove(req.body.deleteMessage, function deleteMessage(err) {
    if (err) return next(err);
    res.redirect("/");
  });
});
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.get("/create-post", (req, res) => {
  if (req.user) {
    res.render("create-post-form", { user: req.user });
  } else {
    res.redirect("/");
  }
});
app.get("/log-out", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.get("/secret", (req, res) => {
  if (req.user) {
    res.render("secret", { user: req.user });
  } else {
    res.redirect("/");
  }
});

app.get("/", function (req, res) {
  Post.find((err, posts) => {
    // console.log(req.user);

    if (!err) {
      res.render("index", {
        user: req.user,
        data: posts,
      });
    } else {
      console.log("Failed to retrieve data " + err);
    }
  });
});
