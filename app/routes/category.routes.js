// env
require("dotenv").config();
// api prefix
const apiPrefix = process.env.API_PREFIX;

module.exports = (app) => {
  const category = require("../controllers/category.controller");

  app.post(`${apiPrefix}/category`, category.create);
  app.put(`${apiPrefix}/update-category/:categoryId`, category.updateCategory);
  app.get(`${apiPrefix}/category/:userId`, category.findById);
  app.get(`${apiPrefix}/category`, category.selectAll);
};
