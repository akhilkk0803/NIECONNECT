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
      new mongoose.Schema(
        {
          message: String,
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
          },
        },

        { timestamps: true }
      ),
    ],
    hashtag: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
