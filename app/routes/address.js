// env
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Address = require("../controllers/address");
// helper
const validate = require("../validator/address");

module.exports = (app) => {
  // get all user address
  app.get(`${apiPrefix}/address`, auth, Address.getAllAddress);
  // create
  app.post(
    `${apiPrefix}/address`,
    auth,
    validate.createAddress,
    Address.create
  );
  // update
  app.put(
    `${apiPrefix}/update-address/:addressId`,
    auth,
    validate.createAddress,
    Address.update
  );
  // delete
  app.delete(`${apiPrefix}/delete-address/:addressId`, auth, Address.delete);
};
