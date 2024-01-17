const Auth = require("../models/auth");
const Socials = require("../models/SocialInteraction");
const bcrypt = require("bcryptjs");
const generateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;
  return error;
};
exports.signUp = async (req, res, next) => {
  const { username, password, name, dp, about } = req.body;
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
  const { username, password, name, dp } = req.body;
  const auth = req.auth;
  console.log(auth);
  try {
    const currUser = await Auth.findById(auth);
    const user = await Auth.findOne({
      _id: {
        $ne: currUser._id,
      },
      username,
    });
    if (user) {
      throw generateError("User name already exists", 403);
    }
    const hashpw = bcrypt.hashSync(password, 10);
    const uploaded = await Auth.findByIdAndUpdate(currUser._id, {
      username,
      password: hashpw,
      name,
      dp,
    });
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
    const socials = await Socials.findOne({ auth: id });
    res.json({ user, socials });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
exports.getUser = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await Auth.findOne({ username });
    if (!user) {
      throw generateError("Not Found", 404);
    }
    const socials = await Socials.findOne({ auth: user._id }).populate({
      path: "posts",
      populate: {
        path: "comments",
        populate: {
          path: "user",
        },
      },

      populate: {
        path: "auth",
      },
    });
    res.json({ user, socials });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
