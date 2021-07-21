const User = require("../models/user.model");

// create
exports.create = (req, res) => {
  const userData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  });

  User.create(userData, (err, data) => {
    if (err) {
      res.status(500).send(err.error);
    } else res.send(data);
  });
};

// find single user by id
exports.findById = (req, res) => {
  User.selectById(req.params.userId, (err, data) => {
    if (err) {
      if (err.find === "not found") {
        res.status(404).send(err);
        return;
      }
      res.status(500).send(err);
    } else res.send(data);
  });
};

exports.selectAll = (req, res) => {
  User.selectAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else res.send(data);
  });
};
