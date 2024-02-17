const fs = require("fs");
const Post = require("../models/post");
const Auth = require("../models/auth");
const Socials = require("../models/SocialInteraction");
const generateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;
  return error;
};
exports.getUserPost = async (req, res, next) => {
  const auth = req.auth;
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) {
      const posts = await Socials.find({ auth }, { posts: 1 }).populate(
        "posts"
      );
      res.json(posts);
    } else {
      const user = await Auth.findById(id);
      if (!user) {
        throw generateError("User Not Found", 404);
      }

      const posts = await Socials.find(
        { auth: user._id },
        { posts: 1 }
      ).populate("posts");
      res.json(posts);
    }
  } catch (error) {
    error.message = "User Not Found";
    error.statusCode = error.statusCode ? error.statusCode : 404;
    next(error);
  }
};
exports.getAllPost = async (req, res, next) => {
  const auth = req.auth;
  const followings = (await Socials.findOne({ auth }, { following: 1 }))
    ?.following;
  if (!followings) {
    res.status(404).json({ message: "NOT FOUND" });
    return;
  }
  console.log(followings);
  // const post = await Post.find({ auth: followings });
  const post = followings.map(
    async (id) =>
      await Post.find({ auth: id })
        .sort({ createdAt: -1 })
        .limit(2)
        .populate("auth")
        .populate({
          path: "comments",
          populate: {
            path: "user",
          },
        })
  );
  Promise.all(post).then((result) => {
    console.log(...result);
    res.json(result);
  });
  console.log(post);
  // const posts = await Socials.find({ followers: auth }, { posts: 1 });
  // res.json(post);
};
exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  console.log("first");
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw generateError("Not Found", 404);
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.postPost = async (req, res, next) => {
  const { image, caption, hashtag } = req.body;
  console.log(req.userId);
  const post = await Post.create({ image, caption, hashtag, auth: req.auth });
  await Socials.findOneAndUpdate(
    { auth: req.auth },
    {
      $push: {
        posts: { $each: [post._id], $position: 0 },
      },
    }
  );
  res.json(post);
};
exports.uploadPic = async (req, res, next) => {
  const filenames = req.files.map((el) => el.filename);
  res.json(filenames);
};
exports.updatePost = async (req, res, next) => {};
exports.deletePic = async (req, res, next) => {
  const { img } = req.body;
  await fs.unlink("public/post/" + img, (err) => {
    if (err) {
      console.log(err);
    } else res.json("OK");
  });
};
exports.addComment = async (req, res, next) => {
  const { postId, message } = req.body;
  console.log(postId);
  const post = await Post.findByIdAndUpdate(postId, {
    $push: { comments: { $each: [{ message, user: req.auth }], $position: 0 } },
  });
  const comments = await Post.findById(postId).populate({
    path: "comments",
    populate: "user",
  });
  res.json(comments.comments);
};
exports.addLike = async (req, res, next) => {
  const { like, postId } = req.query;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw generateError("Not Found", 404);
    }
    if (like === "true") {
      await Post.findByIdAndUpdate(postId, { $push: { Likes: req.auth } });
    } else {
      await Post.findByIdAndUpdate(postId, { $pull: { Likes: req.auth } });
    }
    const result = await Post.findById(postId, { Likes: 1 });
    res.json(result);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
