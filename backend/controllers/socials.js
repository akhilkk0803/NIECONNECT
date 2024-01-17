const Socials = require("../models/SocialInteraction");
exports.create = async (req, res, next) => {
  const social = await Socials.create({ auth: req.userId });
  req.socials = social._id;
  next();
};
