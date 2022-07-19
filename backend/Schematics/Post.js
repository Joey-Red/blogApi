mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: String, required: true },
  added: { type: String, required: true },
  comments: { type: Array, required: false },
  publish: { type: Boolean, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
