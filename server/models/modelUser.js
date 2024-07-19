const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addUserSchema = new Schema({
  username: {
    type: String,
    require: [true, "Username is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    becrypt: true,
  },
});

addUserSchema.plugin(require("mongoose-bcrypt"));

const users = mongoose.model("users", addUserSchema);
module.exports = users;
