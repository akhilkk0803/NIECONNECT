const Auth = require("../models/auth");
const SocialInteraction = require("../models/SocialInteraction");
const Socials = require("../models/SocialInteraction");
const bcrypt = require("bcryptjs");
const generateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;
  return error;
};
exports.signUp = async (req, res, next) => {
  console.log(req.body);
  const { username, password, name, dp, about } = req.body;
  console.log(username, password, name, dp, about);
  try {
    const user = await Auth.findOne({ username });
    if (user) {
      throw generateError("Already exists", 403);
    }
    const hashpw = bcrypt.hashSync(password, 10);
    const created_auth = await Auth.create({
      username,
      password: hashpw,
      name,
      dp,
      about,
      type: req.type,
    });
    req.userId = created_auth._id;
    next();
  } catch (error) {
    next(error);
  }
};
exports.logIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await Auth.findOne({ username });
    if (!user) {
      throw generateError(" Does not exsist Please SignUp", 404);
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw generateError("Incorrect Password", 401);
    }
    req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const { username, dp, about, name } = req.body;
  const auth = req.auth;
  console.log(auth);
  try {
    const currUser = await Auth.findById(auth);
    const Exsitinguser = await Auth.findOne({
      _id: {
        $ne: currUser._id,
      },
      username,
    });
    if (Exsitinguser) {
      throw generateError("User name already exists", 403);
    }
    let uploaded = await Auth.findByIdAndUpdate(currUser._id, {
      username,
      about,
      name,
      dp,
    });
    uploaded = await Auth.findById(currUser._id);
    res.json(uploaded);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
exports.getCurrUser = async (req, res, next) => {
  const id = req.auth;
  try {
    const user = await Auth.findById(id);
    if (!user) {
      throw generateError("Not Found", 404);
    }
    const socials = await Socials.findOne({ auth: user._id });
    res.json({ user, socials });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
exports.getUser = async (req, res, next) => {
  const { username } = req.params;
  const { suggestion } = req.query;
  console.log(suggestion);
  try {
    if (suggestion === "true") {
      const users = await Auth.find({
        username: { $regex: `${username}`, $options: "i" },
      });
      res.json(users);
      return;
    }
    const user = await Auth.findOne({ username });
    if (!user) {
      throw generateError("Not Found", 404);
    }
    const socials = await Socials.findOne({ auth: user._id })
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          populate: {
            path: "user",
          },
        },
      })
      .populate({
        path: "posts",
        populate: {
          path: "auth",
        },
      })
      .populate("following")
      .populate("followers");
    res.json({ user, socials });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
exports.follow = async (req, res, next) => {
  const { request, user } = req.query;
  console.log(request, user);
  const id = req.auth;
  try {
    const targetuser = await Auth.findById(user);
    if (!targetuser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    const socials = await Socials.findOne({ auth: id });
    if (request === "true") {
      await Socials.findOneAndUpdate(
        { auth: id },
        { $push: { following: user } }
      );
      await Socials.findOneAndUpdate(
        { auth: user },
        { $push: { followers: id } }
      );
    } else if (request === "false") {
      await Socials.findOneAndUpdate(
        { auth: id },
        { $pull: { following: user } }
      );
      await Socials.findOneAndUpdate(
        { auth: user },
        { $pull: { followers: id } }
      );
    }
    res.json("OK");
  } catch (error) {
    next(error);
  }
};
exports.getTypeSpecific = async (req, res, next) => {
  const { type } = req.params;
  const data = await Auth.find({ type });
  res.json(data);
};
