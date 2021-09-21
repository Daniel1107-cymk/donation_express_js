const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.quoteData = [
  check("title", "Is required").notEmpty(),
  check("description", "Is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseFormat.format(errors));
    } else next();
  },
];
