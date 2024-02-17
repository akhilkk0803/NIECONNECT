const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const isAuth = require("../controllers/is-auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/dp");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(" ");
    const newname = "dp" + Math.random() + Date.now() + "." + extension;
    cb(null, newname);
  },
});
const upload = multer({ storage });

router.put("/", isAuth, authControllers.update);
router.get("/:username", authControllers.getUser);
router.get("/", isAuth, authControllers.getCurrUser);
router.put("/follow", isAuth, authControllers.follow);
router.post("/dp", upload.single("dp"), (req, res, next) => {
  const dp = req.file;
  console.log(dp);
  res.json(dp);
});
router.get("/all/:type", authControllers.getTypeSpecific);
module.exports = router;
