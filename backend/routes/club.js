const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const clubControllers = require("../controllers/club");
const isAuth = require("../controllers/is-auth");
const socialControllers = require("../controllers/socials");
const typeMiddleware = (req, res, next) => {
  req.type = "club";
  next();
};
router.post("/", authControllers.logIn, clubControllers.getCurrentClub);
router.get("/:id", clubControllers.getClub);
router.post(
  "/new",
  typeMiddleware,
  authControllers.signUp,
  socialControllers.create,
  clubControllers.addClub,
  clubControllers.getCurrentClub
);
router.get("/announce/:id", clubControllers.getAnnounce);
router.get("/announce", clubControllers.getAnnounce);
router.post("/announce", isAuth, clubControllers.announce);
router.put("/update", isAuth, authControllers.update);
router.get("/announcements/all", clubControllers.getAllAnnounce);
module.exports = router;
