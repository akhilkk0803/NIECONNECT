const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const isAuth = require("../controllers/is-auth");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const getFileName = (originalname) => {
  const extension = originalname.split(" ");
  const newname = "dp" + Math.random() + Date.now() + "." + extension;
  return newname;
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
console.log(BUCKETREGION);
router.put("/", isAuth, authControllers.update);
router.get("/:username", authControllers.getUser);
router.get("/", isAuth, authControllers.getCurrUser);
router.put("/follow", isAuth, authControllers.follow);
router.post("/dp", upload.single("dp"), async (req, res, next) => {
  const fname = getFileName(req?.file?.originalname);
  const command = new PutObjectCommand({
    Bucket: BUCKETNAME,
    Key: fname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  });
  await s3.send(command);
  const publicUrl = `https://${BUCKETNAME}.s3.${BUCKETREGION}.amazonaws.com/${fname}`;
  res.json(publicUrl);
});
router.get("/all/:type", authControllers.getTypeSpecific);
module.exports = router;
