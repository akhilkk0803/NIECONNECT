const Club = require("../models/club");
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
exports.getCurrentClub = async (req, res, next) => {
  const club = await Club.findOne({ auth: req.userId }).populate("auth");
  try {
    if (!club) {
      throw generateError("No club found", 404);
    }
    const token = getToken(club._id, req.userId);
    res.status(200).json({ token, user: club });
  } catch (error) {
    next(error);
  }
};
exports.getClub = async (req, res, next) => {
  const { id } = req.params;
  try {
    const club = await Club.findById(id);
    if (!club) {
      throw generateError("Club Not Found", 404);
    }
    res.status(200).json(club);
  } catch (error) {
    next(error);
  }
};
exports.addClub = async (req, res, next) => {
  const club = await Club.create({
    auth: req.userId,
    socials: req.socials,
  });
  const token = getToken(club._id, req.userId);
  res.status(200).json({ club, token });
};
exports.updateClub = async (req, res, next) => {
  res.json("OK");
};
