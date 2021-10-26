const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.createCategory = [
  check("name", "Is required").notEmpty(),
  check("priority", "Is required").notEmpty(),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(422)
        .json(responseFormat.format(error?.errors ?? error));
    } else next();
  },
];
