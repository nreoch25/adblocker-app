import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  type: { type: String, default: "user" }

});

UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validUserPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
