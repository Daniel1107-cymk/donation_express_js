const jwt = require("jsonwebtoken");
const User = require("../models/user");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const config = process.env;

const verifyToken = asyncWrap(async (req, res, next) => {
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
    const user = await User.findById(decoded.user_id);
    const err = [
      {
        msg: "Invalid token",
        param: "token",
        location: "headers",
      },
    ];
    if (user) {
      if (user.token === token) {
        req.user = decoded;
      } else {
        return res.status(401).json(responseFormat.format(err, false));
      }
    } else {
      return res.status(401).json(responseFormat.format(err, false));
    }
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
});

module.exports = verifyToken;
