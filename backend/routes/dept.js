const isAuth = require("../controllers/is-auth");
const express = require("express");
const socialControllers = require("../controllers/socials");
const authControllers = require("../controllers/auth");
const DeptControllers = require("../controllers/dept");
const router = express.Router();
router.post("/", authControllers.logIn, DeptControllers.getCurrentDept);
router.get("/:id", DeptControllers.getDept);
router.post(
  "/new",
  authControllers.signUp,
  socialControllers.create,
  DeptControllers.addDept
);
// router.post("/announcment");
module.exports = router;
