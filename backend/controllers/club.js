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
  await Club.create({
    auth: req.userId,
    socials: req.socials,
  });
  next();
};
exports.updateClub = async (req, res, next) => {
  res.json("OK");
};
exports.announce = async (req, res, next) => {
  const auth = req.auth;
  const { message } = req.body;
  try {
    const club = await Club.findOne({ auth });
    if (!club) {
      throw generateError("CLUB NOT FOUND", 404);
    }
    const announcement = await Club.findOneAndUpdate(
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
    const club = await Club.findOne({ auth: id }, { announcements: 1 });
    if (!club) {
      throw generateError("CLUB NOT FOUND", 404);
    }
    res.json(club.announcements);
  } catch (error) {
    next(error);
  }
};
exports.getAllAnnounce = async (req, res, next) => {
  const { limits } = req.query;
  let announcements = await Club.find(
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
