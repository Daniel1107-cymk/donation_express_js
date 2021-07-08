const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastname: String,
  address: String,
  phoneNumber: String,
});

const User = mongoose.model("users", userSchema);

User.create = (userData, result) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    phoneNumber: userData.phoneNumber,
  });

  user
    .save()
    .then((createdUser) => {
      result(null, { data: createdUser, success: true });
    })
    .catch((err) => {
      result({ error: err, success: false }, null);
    });
};

User.selectById = (userId, result) => {
  User.findById(userId, (err, user) => {
    if (err) {
      result({ error: err, success: false }, null);
    } else {
      result(null, { data: user, success: true });
    }
  });
};

User.selectAll = (result) => {
  User.find({}, (err, user) => {
    if (err) {
      result({ error: err, success: false }, null);
    } else {
      result(null, { data: user, success: true });
    }
  });
};

module.exports = User;
