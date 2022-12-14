/* * 👇
 *This is User Schema
 *It will contain username,email, and password and if the user is an admin or not
 */

const mongoose = require("mongoose");
// create new shcema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
