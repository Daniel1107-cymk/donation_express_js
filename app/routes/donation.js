const multer = require("multer");
const upload = multer();
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Donation = require("../controllers/donation");
// helper
const validate = require("../validator/donation");

module.exports = (app) => {
  // create
  const cpUpload = upload.fields([{ name: "images" }]);
  app.post(
    `${apiPrefix}/donation`,
    auth,
    cpUpload,
    validate.donationData,
    Donation.create
  );
  // get all user donation
  app.get(`${apiPrefix}/donation`, auth, Donation.getAllDonation);
  // get single donation details
  app.get(`${apiPrefix}/donation/:donationId`, auth, Donation.getDonation);
};
