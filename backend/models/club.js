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
    announcements: [
      new mongoose.Schema(
        {
          message: String,
          auth: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
          },
        },
        { timestamps: true }
      ),
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Club", clubSchema);
