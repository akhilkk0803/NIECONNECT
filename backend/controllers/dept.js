const dept = require("../models/dept");
const Dept = require("../models/dept");
const jwt = require("jsonwebtoken");
const generateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;
  return error;
};
const getToken = (id, auth) => {
  const token = jwt.sign({ id, auth }, process.env.JWT_KEY);
  return token;
};
exports.getCurrentDept = async (req, res, next) => {
  const dept = await Dept.findOne({ auth: req.userId }).populate("auth").populate('socials');
  try {
    if (!dept) {
      throw generateError("No dept found", 404);
    }
    const token = getToken(dept._id, req.userId);
    res.status(200).json({ token, user: dept });
  } catch (error) {
    next(error);
  }
};
exports.getDept = async (req, res, next) => {
  const { deptId } = req.params;
  try {
    const dept = await Dept.findById(deptId);
    if (!dept) {
      throw generateError("Dept Not Found", 404);
    }
    res.status(200).json(dept);
  } catch (error) {
    next(error);
  }
};
exports.addDept = async (req, res, next) => {
  await Dept.create({
    auth: req.userId,
    socials: req.socials,
  });
  next();
};
exports.updateDept = async (req, res, next) => {
  res.json("OK");
};
exports.announce = async (req, res, next) => {
  const auth = req.auth;
  console.log(auth);
  const { message } = req.body;
  try {
    const dept = await Dept.findOne({ auth });
    if (!dept) {
      throw generateError("dept NOT FOUND", 404);
    }
    const announcement = await Dept.findOneAndUpdate(
      { auth },
      {
        $push: {
          announcements: {
            $each: [{ message, auth }],
            $position: 0,
          },
        },
      }
    );
    res.json(announcement);
  } catch (error) {
    next(error);
  }
};
exports.getAnnounce = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dept = await Dept.findOne({ auth: id }, { announcements: 1 });
    if (!dept) {
      throw generateError("Dept NOT FOUND", 404);
    }
    res.json(dept.announcements);
  } catch (error) {
    next(error);
  }
};
exports.getAllAnnounce = async (req, res, next) => {
  const { limits } = req.query;
  let announcements = await Dept.find(
    {},
    { announcements: 1, auth: 1, _id: 0 }
  ).populate("announcements.auth");
  announcements = announcements
    .map((el) => el.announcements)
    .flat(1)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, parseInt(limits));
  res.json(announcements);
};
