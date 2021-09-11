const byscrypt = require("bcrypt");
const User = require("../models/user");
// helper
const generate = require("../helpers/generate");
const responseFormat = require("../helpers/response.format");

const UserController = {
  login: async (req, res) => {
    try {
      const body = req.body;

      const user = await User.findOne({ email: body.email }, "-_id -__v");
      if (user && byscrypt.compareSync(body.password, user.password)) {
        // save user token
        user.token = await generate.token({
          userId: user._id,
          email: body.email,
        });

        res.status(200).json(responseFormat.format(user, true));
      } else {
        const err = [
          {
            msg: "Invalid credentials",
            param: "password",
            location: "body",
          },
        ];
        return res.status(400).send(responseFormat.format(err, false));
      }
    } catch (err) {
      return res
        .status(500)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  googleSignIn: async (req, res) => {
    try {
      const body = req.body;

      const user = await User.findOne(
        { email: body.email, google_id: body.google_id },
        "-_id -__v"
      );
      if (user) {
        // save user token
        user.token = await generate.token({
          userId: user._id,
          email: body.email,
        });

        res.status(200).json(responseFormat.format(user, true));
      } else {
        // check if user exist
        const oldUser = await User.findOne({ email: body.email });
        if (oldUser) {
          const err = [
            {
              msg: "Email already exist",
              param: "password",
              location: "body",
            },
          ];
          return res.status(409).send(responseFormat.format(err, false));
        }
        const user = await User.create({
          email: body.email,
          password: byscrypt.hashSync(generate.randomPassword(8), 10),
          first_name: body.first_name,
          last_name: body.last_name,
          phone_number: body.phone_number,
          full_address: body.full_address,
          role: body.role,
          google_id: body.google_id,
        });
        // save user token
        user.token = await generate.token({
          userId: user._id,
          email: body.email,
        });

        return res.status(200).json(responseFormat.format(user, true));
      }
    } catch (err) {
      return res
        .status(500)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  signup: async (req, res) => {
    try {
      const body = req.body;
      // check if user exist
      const oldUser = await User.findOne({ email: body.email });
      if (oldUser) {
        const err = [
          {
            msg: "Email already exist",
            param: "password",
            location: "body",
          },
        ];
        return res
          .status(500)
          .json(responseFormat.format(err?.errors ?? err, false));
      }
      // create user
      const user = await User.create({
        email: body.email,
        password: byscrypt.hashSync(body.password, 10),
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number,
        full_address: body.full_address,
        role: body.role,
        google_id: body.google_id,
      });
      // save user token
      user.token = await generate.token({
        userId: user._id,
        email: body.email,
      });

      return res.status(200).json(responseFormat.format(user, true));
    } catch (err) {
      return res
        .status(500)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  updateProfile: async (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((updatedProfile) => {
        return res
          .status(200)
          .json(responseFormat.format(updatedProfile, true));
      })
      .catch((err) => {
        return res.status(500).json(responseFormat.format(err, false));
      });
  },
  getUser: async (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) return res.status(500).json(responseFormat.format(err, false));

      return res.status(200).json(responseFormat.format(user, true));
    });
  },
  getAllUser: async (req, res) => {
    User.find({}, "-_id -__v", (err, user) => {
      if (err) return res.status(200).json(responseFormat.format(err, false));

      return res.status(200).json(responseFormat.format(user, true));
    });
  },
};

module.exports = UserController;
