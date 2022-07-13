mongoose = require("mongoose");

const UserSchema = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false },
  })
);

module.exports = mongoose.model("User", UserSchema);
