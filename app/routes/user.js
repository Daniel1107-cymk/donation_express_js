// env
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const User = require("../controllers/user");
// helper
const validate = require("../validator/auth");

module.exports = (app) => {
  // login
  app.post(`${apiPrefix}/login`, validate.login, User.login);
  // login with google
  app.post(`${apiPrefix}/google-signin`, User.googleSignIn);
  // sign up
  app.post(`${apiPrefix}/register`, validate.signup, User.signup);
  // update profile
  app.put(`${apiPrefix}/update-profile/:userId`, auth, User.updateProfile);
  // find single user by id
  app.get(`${apiPrefix}/users/:userId`, auth, User.getUser);
  // select all user
  app.get(`${apiPrefix}/users`, auth, User.getAllUser);
};