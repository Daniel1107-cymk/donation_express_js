// env
require("dotenv").config();
// api prefix
const apiPrefix = process.env.API_PREFIX;

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // create a new user
  app.post(`${apiPrefix}/register`, users.create);

  // find single user by id
  app.get(`${apiPrefix}/users/:userId`, users.findById);

  // select all user
  app.get(`${apiPrefix}/users`, users.selectAll);
};
