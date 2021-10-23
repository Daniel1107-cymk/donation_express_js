const multer = require("multer");
const upload = multer();
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Quote = require("../controllers/quote");
// helper
const validate = require("../validator/quote");

module.exports = (app) => {
  const cpUpload = upload.single("image");
  // save
  app.post(
    `${apiPrefix}/quote`,
    auth,
    cpUpload,
    validate.quoteData,
    Quote.create
  );
  // get all quote
  app.get(`${apiPrefix}/quote`, auth, Quote.getAllQuote);
  app.delete(`${apiPrefix}/quote/:quoteId`, auth, Quote.deleteQuote);
};
