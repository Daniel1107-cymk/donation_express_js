// env
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const User = require("../controllers/user");
// helper
const validate = require("../validator/user");

module.exports = (app) => {
  // login
  app.post(`${apiPrefix}/login`, validate.login, User.login);
  // login with google
  app.post(
    `${apiPrefix}/google-signin`,
    validate.google_signin,
    User.googleSignIn
  );
  // sign up
  app.post(
    `${apiPrefix}/validate-email`,
    validate.validate_email,
    User.validateEmail
  );
  app.post(`${apiPrefix}/register`, validate.signup, User.signup);
  // get profile
  app.get(`${apiPrefix}/profile`, auth, User.getProfile);
  // update profile
  app.put(`${apiPrefix}/update-profile`, auth, User.updateProfile);
  // find single user by id
  app.get(`${apiPrefix}/users/:userId`, auth, User.getUser);
  // select all user
  app.get(`${apiPrefix}/users`, auth, User.getAllUser);
};
