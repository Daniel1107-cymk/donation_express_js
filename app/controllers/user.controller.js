const User = require("../models/user.model");

// create
exports.create = (req, res) => {
  User.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err.error);
    return res.send(data);
  });
};

// find single user by id
exports.findById = (req, res) => {
  User.selectById(req.params.userId, (err, data) => {
    if (err) {
      if (err.find === "not found") return res.status(404).send(err);
      return res.status(500).send(err);
    }
    return res.send(data);
  });
};

exports.selectAll = (req, res) => {
  User.selectAll((err, data) => {
    if (err) return res.status(500).send(err);
    return res.send(data);
  });
};
