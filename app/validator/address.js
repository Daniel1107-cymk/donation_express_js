const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.createAddress = [
  check("address", "Is required").notEmpty(),
  check("city", "Is required").notEmpty(),
  check("zipcode", "Is required").notEmpty(),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(422)
        .json(responseFormat.format(error?.errors ?? error));
    } else next();
  },
];
