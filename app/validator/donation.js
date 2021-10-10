const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.donationData = [
  check("donation_details", "Donation Details is required").notEmpty(),
  check("community", "Community id is required").notEmpty(),
  check("pickup_date", "Pick up date is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseFormat.format(errors.errors, false));
    } else next();
  },
];
