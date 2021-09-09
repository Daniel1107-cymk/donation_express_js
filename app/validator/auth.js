const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.signup = [
  check("email", "Invalid email").isEmail(),
  check("password", "Minimal password length is 8 character").isLength({
    min: 8,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseFormat.format(errors.errors, false));
    } else next();
  },
];

exports.login = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseFormat.format(errors.errors, false));
    } else next();
  },
];
