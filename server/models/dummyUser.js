const mongoose = require("mongoose");

const DummyUserSchema = mongoose.Schema(
  {
    // name of dummyUser
    name: {
      type: String,
      required: true,
    },

    //email id of the dummyUser
    email: {
      type: String,
      unique: true,
      required: true,
    },

    //phone number for the dummyUser
    phone: {
      type: Number,
      required: true,
    },

    // Status of dummyUser
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DummyUser = mongoose.model("DummyUser", DummyUserSchema); //modelling the schema
module.exports = DummyUser;
