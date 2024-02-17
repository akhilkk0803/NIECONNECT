const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
    },
    about: String,
    type: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Auth", authSchema);
