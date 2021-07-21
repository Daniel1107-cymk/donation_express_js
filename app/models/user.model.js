const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  googleId: String,
});

const User = mongoose.model("users", userSchema);

const responseFormat = (data, success) => {
  if (success) {
    return {
      data: data,
      success: true,
    };
  } else {
    return {
      error: data,
      success: false,
    };
  }
};

User.create = (userData, result) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    phoneNumber: userData.phoneNumber,
    googleId: userData.googleId,
  });

  user
    .save()
    .then((createdUser) => {
      result(null, responseFormat(createdUser, true));
    })
    .catch((err) => {
      result(responseFormat(err, false), null);
    });
};

User.selectById = (userId, result) => {
  User.findById(userId, (err, user) => {
    if (err) return result(responseFormat(err, false), null);

    return result(null, responseFormat(user, true));
  });
};

User.selectAll = (result) => {
  User.find({}, (err, user) => {
    if (err) return result(responseFormat(err, false), null);

    return result(null, responseFormat(user, true));
  });
};

module.exports = User;
