const express = require("express");
const postContoller = require("../controllers/post");
const isAuth = require("../controllers/is-auth");
const multer = require("multer");
const router = express.Router();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const getFileName = (originalname) => {
  const extension = originalname.split(" ");
  const newname = "post" + Math.random() + Date.now() + "." + extension;
  return newname;
};

const storage = multer.memoryStorage();

const BUCKETNAME = process.env.BUCKET_NAME;
const BUCKETREGION = process.env.BUCKET_REGION;
const ACCESSKEY = process.env.ACCESS_KEY;
const SECRETACCESSKEY = process.env.SECRET_ACCESS_KEY;
const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETACCESSKEY,
  },
  region: BUCKETREGION,
});
const upload = multer({ storage });
router.get("/", isAuth, postContoller.getAllPost);
router.get("/:id", postContoller.getPost);
router.get("/user/:id", isAuth, postContoller.getUserPost);
router.post(
  "/upload/pic",
  upload.array("photos", 10),
  async (req, res, next) => {
    const filenames = [];
    for (const file of req.files) {
      const fname = getFileName(file.originalname);
      const command = new PutObjectCommand({
        Bucket: BUCKETNAME,
        Key: fname,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await s3.send(command);
      const publicUrl = `https://${BUCKETNAME}.s3.${BUCKETREGION}.amazonaws.com/${fname}`;
      filenames.push(publicUrl);
    }
    res.json(filenames);
  }
);
router.post("/comment", isAuth, postContoller.addComment);
router.delete("/pic/", postContoller.deletePic);
router.post("/new", isAuth, postContoller.postPost);
router.put("/update", postContoller.updatePost);
router.put("/like", isAuth, postContoller.addLike);
router.delete("/:id", isAuth, postContoller.deletePost);
module.exports = router;
