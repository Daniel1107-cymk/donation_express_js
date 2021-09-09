const mongoose = require("mongoose");
const responseFormat = require("../helpers/response.format");
const byscrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  full_address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 0,
  },
  google_id: {
    type: String,
  },
});

const User = mongoose.model("users", userSchema);

let UserModel = {
  create: (userData, result) => {
    const user = new User({
      email: userData.email,
      password:
        userData.password !== undefined
          ? byscrypt.hashSync(userData.password, 10)
          : null,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      full_address: userData.full_address,
      role: userData.role,
      google_id: userData.google_id,
    });
    user
      .save()
      .then((createdUser) => {
        return result(null, responseFormat.format(createdUser, true));
      })
      .catch((err) => {
        return result(responseFormat.format(err, false), null);
      });
  },
  updateProfile: (userData, result) => {
    User.findByIdAndUpdate(userData.id, userData, { new: true })
      .then((updatedProfile) => {
        return result(null, responseFormat.format(updatedProfile, true));
      })
      .catch((err) => {
        return result(responseFormat.format(err, false), null);
      });
  },
  selectById: (userId, result) => {
    User.findById(userId, (err, user) => {
      if (err) return result(responseFormat.format(err, false), null);

      return result(null, responseFormat.format(user, true));
    });
  },
  selectAll: (result) => {
    User.find({}, "-_id -__v", (err, user) => {
      if (err) return result(responseFormat.format(err, false), null);

      return result(null, responseFormat.format(user, true));
    });
  },
};

module.exports = UserModel;
