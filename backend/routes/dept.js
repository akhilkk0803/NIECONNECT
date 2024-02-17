const isAuth = require("../controllers/is-auth");
const express = require("express");
const socialControllers = require("../controllers/socials");
const authControllers = require("../controllers/auth");
const DeptControllers = require("../controllers/dept");
const router = express.Router();
const typeMiddleware = (req, res, next) => {
  req.type = "dept";
  next();
};
router.post("/", authControllers.logIn, DeptControllers.getCurrentDept);
router.get("/:id", DeptControllers.getDept);
router.post(
  "/new",
  typeMiddleware,
  authControllers.signUp,
  socialControllers.create,
  DeptControllers.addDept,
  DeptControllers.getCurrentDept
);
router.post("/announce", isAuth, DeptControllers.announce);
router.get("/announce/:id", DeptControllers.getAnnounce);
router.get("/announcements/all", DeptControllers.getAllAnnounce);
module.exports = router;
