const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    //email id of the doctor
    email: {
      type: String,
      unique: true,
      required: true,
    },

    //password for the doctor's account
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema); //modelling the schema
module.exports = User;
