const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const clubControllers = require("../controllers/club");
const isAuth = require("../controllers/is-auth");
const socialControllers = require("../controllers/socials");
router.post("/", authControllers.logIn, clubControllers.getCurrentClub);
router.get("/:id", clubControllers.getClub);
router.post(
  "/new",
  authControllers.signUp,
  socialControllers.create,
  clubControllers.addClub
);
router.put("/update", isAuth, authControllers.update);
module.exports = router;
