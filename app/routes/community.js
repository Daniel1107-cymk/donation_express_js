const multer = require("multer");
const upload = multer();
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Community = require("../controllers/community");
// helper
const validate = require("../validator/community");

module.exports = (app) => {
  const cpUpdload = upload.single("banner");
  // save
  app.post(
    `${apiPrefix}/community`,
    auth,
    cpUpdload,
    validate.communityData,
    Community.create
  );
  // get all community
  app.get(`${apiPrefix}/community`, auth, Community.getAllCommunity);
  // update community
  app.put(
    `${apiPrefix}/community/:communityId`,
    auth,
    cpUpdload,
    validate.communityData,
    Community.update
  );
  // delete
  app.delete(`${apiPrefix}/community/:communityId`, auth, Community.delete);
  // get community by id
  app.get(`${apiPrefix}/community/:communityId`, auth, Community.getCommunity);
};
