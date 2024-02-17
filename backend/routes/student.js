const express = require("express");
const isAuth = require("../controllers/is-auth");
const studentController = require("../controllers/student");
const authController = require("../controllers/auth");
const socialController = require("../controllers/socials");
const router = express.Router();
const typeMiddleware = (req, res, next) => {
  req.type = "student";
  next();
};
router.post("/", authController.logIn, studentController.getCurrentUser);
router.get("/:id", studentController.getUser);
router.post(
  "/new",
  typeMiddleware,
  authController.signUp,
  socialController.create,
  studentController.addUser,
  studentController.getCurrentUser
);

module.exports = router;
