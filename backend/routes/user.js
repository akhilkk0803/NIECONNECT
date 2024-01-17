const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const isAuth = require("../controllers/is-auth");
router.put("/update", isAuth, authControllers.update);
router.get("/:username", authControllers.getUser);
module.exports = router;
