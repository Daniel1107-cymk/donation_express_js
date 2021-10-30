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
        const token = generate.token({
          userId: user._id,
          email: user.email,
        });
        const result = {
          token: token,
        };
        user.token = token;
        await user.save();
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
      const token = generate.token({
        userId: checkEmailandGoogleIdUser._id,
        email: checkEmailandGoogleIdUser.email,
      });
      const result = {
        token: token,
      };
      checkEmailandGoogleIdUser.token = token;
      await checkEmailandGoogleIdUser.save();
      return res.status(200).json(responseFormat.format(result, true));
    } else {
      const checkEmailUser = await User.findOne(
        {
          email: body.email,
        },
        "email first_name last_name -_id"
      );
      if (checkEmailUser) {
        const msg = {
          msg: "Email exists",
          data: checkEmailUser,
        };
        return res.status(200).json(responseFormat.format(msg, true));
      } else {
        const createUserWithGoogleId = await User.create({
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          password: generate.randomPassword(8),
          role: body.role,
          google_id: body.google_id,
        });
        if (createUserWithGoogleId) {
          const token = generate.token({
            userId: createUserWithGoogleId._id,
            email: body.email,
          });
          const result = {
            token: token,
          };
          createUserWithGoogleId.token = token;
          await createUserWithGoogleId.save();

          return res.status(200).json(responseFormat.format(result, true));
        }
      }
    }
  }),
  bindAccount: asyncWrap(async (req, res) => {
    const body = req.body;
    const checkEmailUser = await User.findOne({
      email: body.email,
    });
    if (checkEmailUser) {
      const token = generate.token({
        userId: checkEmailUser._id,
        email: body.email,
      });
      const result = {
        token: token,
      };
      checkEmailUser.token = token;
      checkEmailUser.google_id = body.google_id;
      await checkEmailUser.save();

      return res.status(200).json(responseFormat.format(result, true));
    } else {
      const msg = [
        {
          msg: "Failed, try again",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
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
      role: body.role,
      google_id: body.google_id,
    });
    if (newUser) {
      const token = generate.token({
        userId: newUser._id,
        email: newUser.email,
      });
      const result = {
        token: token,
      };
      newUser.token = token;
      await newUser.save();
      return res.status(200).json(responseFormat.format(result, true));
    }
  }),
  getProfile: asyncWrap(async (req, res) => {
    const email = req.user.email;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json(responseFormat.format(user, true));
    }
    const msg = [
      {
        msg: "Failed, try again",
      },
    ];
    return res.status(400).json(responseFormat.format(msg, false));
  }),
  updateProfile: asyncWrap(async (req, res) => {
    const body = req.body;
    const file = req.file;
    const user = req.user;
    let data;
    if (file !== undefined) {
      data = {
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number,
        picture: file.buffer.toString("base64"),
        mimetype: file.mimetype,
      };
    } else {
      data = {
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number,
      };
    }
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
    const user = await User.findOne({ email: req.body.email });
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
  logout: asyncWrap(async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    let msg;
    if (user) {
      user.token = "";
      await user.save();
      msg = {
        msg: "Logout success",
      };
      return res.status(200).json(responseFormat.format(msg, true));
    } else {
      msg = [
        {
          msg: "Unauthorized",
        },
      ];
      return res.status(401).json(responseFormat.format(msg, false));
    }
  }),
};

module.exports = UserController;
