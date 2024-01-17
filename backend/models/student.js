const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    socials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialInteraction",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Student", studentSchema);
