// env
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Category = require("../controllers/category");
// helper
const validate = require("../validator/category");

module.exports = (app) => {
  // get all category
  app.get(`${apiPrefix}/category`, auth, Category.getAllCategory);
  // create
  app.post(
    `${apiPrefix}/category`,
    auth,
    validate.createCategory,
    Category.create
  );
  // update
  app.put(
    `${apiPrefix}/category/:categoryId`,
    auth,
    validate.createCategory,
    Category.update
  );
  // delete
  app.delete(`${apiPrefix}/category/:categoryId`, auth, Category.delete);
};
