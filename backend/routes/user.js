const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const isAuth = require("../controllers/is-auth");
router.put("/update", isAuth, authControllers.update);
router.get("/:username", authControllers.getUser);
router.get("/", isAuth, authControllers.getCurrUser);
router.put("/follow", isAuth, authControllers.follow);
module.exports = router;
