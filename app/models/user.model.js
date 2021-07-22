const mongoose = require("mongoose");
const responseFormat = require("../helpers/response.format");

const userSchema = mongoose.Schema({
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
      first_name: userData.first_name,
      last_name: userData.last_name,
      full_address: userData.full_address,
      phone_number: userData.phone_number,
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
    User.find({}, (err, user) => {
      if (err) return result(responseFormat.format(err, false), null);

      return result(null, responseFormat.format(user, true));
    });
  },
};

module.exports = UserModel;
