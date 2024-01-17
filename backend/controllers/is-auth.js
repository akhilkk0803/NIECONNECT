const jwt = require("jsonwebtoken");
module.exports = isAuth = async (req, res, next) => {
  const bearer = req.get("Authorization");
  try {
    if (!bearer) {
      const error = new Error("Not Authenticated");
      error.statusCode = 401;
      throw error;
    }
    const token = bearer.split(" ")[1];
    const match = jwt.verify(token, process.env.JWT_KEY, (err, match) => {
      if (!match) {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error;
      }
      req.userId = match.id;
      req.auth = match.auth;
    });

    next();
  } catch (error) {
    next(error);
  }
};
