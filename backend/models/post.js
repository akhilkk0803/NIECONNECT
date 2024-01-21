const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    Likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Auth",
    },
    comments: [
      {
        message: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
        },
      },
    ],
    hashtag: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
