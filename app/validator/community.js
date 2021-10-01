const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.communityData = [
  check("name", "Is required").notEmpty(),
  check("about", "Is required").notEmpty(),
  check("email", "Is required").notEmpty(),
  check("contact_number", "Is required").notEmpty(),
  check("address", "Is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseFormat.format(errors));
    } else next();
  },
];
