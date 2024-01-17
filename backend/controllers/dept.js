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
  const dept = await Dept.findOne({ auth: req.userId });
  try {
    if (!dept) {
      throw generateError("No dept found", 404);
    }
    const token = getToken(dept._id, req.auth);
    res.status(200).json({ token, dept });
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
  const dept = await Dept.create({
    auth: req.userId,
    socials: req.socials,
  });
  const token = getToken(dept._id, req.userId);
  res.status(200).json({ dept, token });
};
exports.updateDept = async (req, res, next) => {
  res.json("OK");
};
