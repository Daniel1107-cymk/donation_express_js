const jwt = require("jsonwebtoken");
// helper
const responseFormat = require("../helpers/response.format");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  let err;
  if (!token) {
    err = [
      {
        msg: "A token is required",
        param: "token",
        location: "headers",
      },
    ];
    return res.status(404).json(responseFormat.format(err, false));
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    err = [
      {
        msg: "Invalid token",
        param: "token",
        location: "headers",
      },
    ];
    return res.status(401).json(responseFormat.format(err, false));
  }
  return next();
};

module.exports = verifyToken;
