const { check, validationResult } = require("express-validator");
const responseFormat = require("../helpers/response.format");

exports.donationData = [
  check("recipient_name", "Recipient name is required").notEmpty(),
  check("phone_number", "Phone number is required").notEmpty(),
  check("category", "Category is required").notEmpty(),
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
