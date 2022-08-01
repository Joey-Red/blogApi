mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentingOnId: { type: String, required: true },
  username: { type: String, required: false },
  title: { type: String, required: false },
  body: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
