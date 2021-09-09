// env
require("dotenv").config();
// api prefix
const apiPrefix = process.env.API_PREFIX;
// validator
const validate = require("../validator/auth");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  // login
  app.post(`${apiPrefix}/login`, validate.login, users.login);
  // create a new user
  app.post(`${apiPrefix}/register`, validate.signup, users.create);
  // update profile
  app.put(`${apiPrefix}/update-profile/:userId`, users.updateProfile);
  // find single user by id
  app.get(`${apiPrefix}/users/:userId`, users.findById);
  // select all user
  app.get(`${apiPrefix}/users`, users.selectAll);
};
