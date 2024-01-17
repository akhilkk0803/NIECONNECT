const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const getToken = (id, auth) => {
  const token = jwt.sign({ id, auth }, process.env.JWT_KEY);
  return token;
};
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate("auth");
  try {
    if (!student) {
      const err = new Error("NOT FOUND");
      err.statusCode = 404;
      throw err;
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};
exports.getCurrentUser = async (req, res, next) => {
  const user = await Student.findOne({ auth: req.userId });
  const token = getToken(user._id, req.userId);
  res.status(200).json({ user, token });
};
exports.addUser = async (req, res, next) => {
  try {
    const created_user = await Student.create({
      auth: req.userId,
      socials: req.socials,
    });
    const token = getToken(created_user._id, req.userId);
    res.json({ user: created_user, token });
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  const { name, dp } = req.body;
  const student = await Student.findByIdAndUpdate(req.userId, { name, dp });
  res.json(student);
};
