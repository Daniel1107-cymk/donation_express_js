// env
require("dotenv").config();
// api prefix
const apiPrefix = process.env.API_PREFIX;

module.exports = (app) => {
  const category = require("../controllers/category.controller");
  // create new category
  app.post(`${apiPrefix}/category`, category.create);
  // update category
  app.put(`${apiPrefix}/update-category/:categoryId`, category.updateCategory);
  // find single user by id
  app.get(`${apiPrefix}/category/:userId`, category.findById);
  // select all category
  app.get(`${apiPrefix}/category`, category.selectAll);
};
