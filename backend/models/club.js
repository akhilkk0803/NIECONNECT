const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    socials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialInteraction",
    },
    announcements: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Club", clubSchema);
