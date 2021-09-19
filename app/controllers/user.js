const byscrypt = require("bcrypt");
const User = require("../models/user");
// helper
const asyncWrap = require("../helpers/async");
const generate = require("../helpers/generate");
const responseFormat = require("../helpers/response.format");

const UserController = {
  login: asyncWrap(async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      if (user && byscrypt.compareSync(body.password, user.password)) {
        const result = {
          token: generate.token({
            userId: user._id,
            email: user.email,
          }),
        };
        return res.status(200).json(responseFormat.format(result, true));
      } else {
        const msg = [
          {
            msg: "Invalid credentials",
            param: "password",
            location: "body",
          },
        ];
        return res.status(400).send(responseFormat.format(msg, false));
      }
    } else {
      const msg = [
        {
          msg: "User not found",
          param: "email",
          location: "body",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
    }
  }),
  googleSignIn: asyncWrap(async (req, res) => {
    const body = req.body;
    // check email and google_id match
    const checkEmailandGoogleIdUser = await User.findOne({
      email: body.email,
      google_id: body.google_id,
    });
    if (checkEmailandGoogleIdUser) {
      const result = {
        token: generate.token({
          userId: checkEmailandGoogleIdUser._id,
          email: checkEmailandGoogleIdUser.email,
        }),
      };
      return res.status(200).json(responseFormat.format(result, true));
    }
    const checkEmailUser = await User.findOne({
      email: body.email,
    });
    if (checkEmailUser) {
      const msg = [
        {
          msg: "Google signin failed, try login with email and password",
          param: "password",
          location: "body",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
    }
    const createUserWithGoogleId = await User.create({
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
      full_address: body.full_address,
      role: body.role,
      google_id: body.google_id,
    });
    if (createUserWithGoogleId) {
      const result = {
        token: generate.token({
          userId: createUserWithGoogleId._id,
          email: body.email,
        }),
      };

      return res.status(200).json(responseFormat.format(result, true));
    }
  }),
  signup: asyncWrap(async (req, res) => {
    const body = req.body;
    // check if email already used
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      const msg = [
        {
          msg: "Email already exist",
          param: "email",
          location: "body",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
    }
    const newUser = await User.create({
      email: body.email,
      password: byscrypt.hashSync(body.password, 10),
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
      full_address: body.full_address,
      role: body.role,
      google_id: body.google_id,
    });
    if (newUser) {
      const result = {
        token: generate.token({
          userId: newUser._id,
          email: newUser.email,
        }),
      };
      return res.status(200).json(responseFormat.format(result, true));
    }
  }),
  updateProfile: asyncWrap(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const data = {
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
    };
    const updatedProfile = await User.findOneAndUpdate(user.email, data, {
      useFindAndModify: false,
      new: true,
    });
    if (updatedProfile) {
      return res.status(200).json(responseFormat.format(updatedProfile, true));
    } else {
      const msg = [
        {
          msg: "Failed, try again",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
    }
  }),
  getUser: asyncWrap(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.status(200).json(responseFormat.format(user, true));
    } else {
      const msg = [
        {
          msg: "User not found",
          param: "email",
          location: "body",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
    }
  }),
  getAllUser: asyncWrap(async (req, res) => {
    const user = await User.find({});
    return res.status(200).json(responseFormat.format(user, true));
  }),
  validateEmail: asyncWrap(async (req, res) => {
    let msg;
    const user = User.findOne({ email: req.body.email });
    if (user) {
      msg = {
        msg: "Email already exists",
        param: "email",
      };
      return res.status(400).json(responseFormat.format([msg], false));
    }
    msg = {
      msg: "Valid email",
    };
    return res.status(200).json(responseFormat.format([msg], true));
  }),
};

module.exports = UserController;
