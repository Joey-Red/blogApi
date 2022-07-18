mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentingOnId: { type: String, required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
