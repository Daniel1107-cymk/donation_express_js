const User = require("../models/user.model");

let UserController = {
  // update profile
  create: (req, res) => {
    User.create(req.body, (err, data) => {
      if (err) return res.status(500).send(err.error);
      return res.send(data);
    });
  },
  // update profile
  updateProfile: (req, res) => {
    User.updateProfile({ id: req.params.userId, ...req.body }, (err, data) => {
      if (err) return res.status(400).send("profile cannot be updated");
      return res.send(data);
    });
  },
  // find single user by id
  findById: (req, res) => {
    User.selectById(req.params.userId, (err, data) => {
      if (err) {
        if (err.find === "not found") return res.status(404).send(err);
        return res.status(500).send(err);
      }
      return res.send(data);
    });
  },
  // select all user
  selectAll: (req, res) => {
    User.selectAll((err, data) => {
      if (err) return res.status(500).send(err);
      return res.send(data);
    });
  },
};

module.exports = UserController;
