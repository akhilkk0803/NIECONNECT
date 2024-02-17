const express = require("express");
const postContoller = require("../controllers/post");
const isAuth = require("../controllers/is-auth");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/post");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(" ");
    const newname = "post" + Math.random() + Date.now() + "." + extension;
    cb(null, newname);
  },
});
const upload = multer({ storage });
router.get("/", isAuth, postContoller.getAllPost);
router.get("/:id", postContoller.getPost);
router.get("/user/:id", isAuth, postContoller.getUserPost);
router.post("/upload/pic", upload.array("photos", 10), postContoller.uploadPic);
router.post("/comment", isAuth, postContoller.addComment);
router.delete("/pic/", postContoller.deletePic);
router.post("/new", isAuth, postContoller.postPost);
router.put("/update", postContoller.updatePost);
router.put("/like", isAuth, postContoller.addLike);
module.exports = router;
