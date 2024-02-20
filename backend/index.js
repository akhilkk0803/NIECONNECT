const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/student");
const clubRoutes = require("./routes/club");
const deptRoutes = require("./routes/dept");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/public", express.static(__dirname + "/public/"));
app.use("/", (req, res, next) => {
  res.json("WELCOME");
  next();
});
app.use("/student", studentRoutes);
app.use("/club", clubRoutes);
app.use("/dept", deptRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("CONNECTED TO MDB"))
  .catch((err) => console.log("Error connecting to mdb"));
app.listen(8080, () => console.log("Server running on port 8080"));
