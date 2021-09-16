const byscrypt = require("bcrypt");
const User = require("../models/user");
// helper
const generate = require("../helpers/generate");
const responseFormat = require("../helpers/response.format");

const UserController = {
  login: (req, res) => {
    const body = req.body;
    User.findOne({ email: body.email }, (err, user) => {
      if (err)
        return res
          .status(422)
          .json(responseFormat.format(err?.errors ?? err, false));

      // check credential
      if (user && byscrypt.compareSync(body.password, user.password)) {
        const result = {
          token: generate.token({
            userId: user._id,
            email: user.email,
          }),
        };
        return res.status(200).json(responseFormat.format(result, true));
      }
      const msg = [
        {
          msg: "Invalid credentials",
          param: "password",
          location: "body",
        },
      ];
      return res.status(400).send(responseFormat.format(msg, false));
    });
  },
  googleSignIn: (req, res) => {
    const body = req.body;
    // check email and google_id match
    User.findOne(
      { email: body.email, google_id: body.google_id },
      (err, user) => {
        if (err)
          return res
            .status(422)
            .json(responseFormat.format(err?.errors ?? err, false));

        if (user) {
          const result = {
            token: generate.token({
              userId: user._id,
              email: user.email,
            }),
          };
          return res.status(200).json(responseFormat.format(result, true));
        }

        // check if email already used
        User.findOne({ email: body.email }, (err, user) => {
          if (user) {
            const msg = [
              {
                msg: "Email already exist",
                param: "password",
                location: "body",
              },
            ];
            return res.status(400).json(responseFormat.format(msg, false));
          }

          // create new user with google_id
          const newUser = User({
            email: body.email,
            password: byscrypt.hashSync(generate.randomPassword(8), 10),
            first_name: body.first_name,
            last_name: body.last_name,
            phone_number: body.phone_number,
            full_address: body.full_address,
            role: body.role,
            google_id: body.google_id,
          });
          newUser.save((err, user) => {
            if (err)
              return res
                .status(422)
                .json(responseFormat.format(err?.errors ?? err, false));

            const result = {
              token: generate.token({
                userId: newUser._id,
                email: body.email,
              }),
            };

            return res.status(200).json(responseFormat.format(result, true));
          });
        });
      }
    );
  },
  signup: (req, res) => {
    const body = req.body;
    // check if email already used
    User.findOne({ email: body.email }, (err, user) => {
      if (user) {
        const msg = [
          {
            msg: "Email already exist",
            param: "password",
            location: "body",
          },
        ];
        return res.status(400).json(responseFormat.format(msg, false));
      }

      // create new user
      const newUser = User({
        email: body.email,
        password: byscrypt.hashSync(body.password, 10),
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number,
        full_address: body.full_address,
        role: body.role,
        google_id: body.google_id,
      });
      newUser.save((err, user) => {
        if (err)
          return res
            .status(422)
            .json(responseFormat.format(err?.errors ?? err, false));

        const result = {
          token: generate.token({
            userId: user._id,
            email: user.email,
          }),
        };
        return res.status(200).json(responseFormat.format(result, true));
      });
    });
  },
  updateProfile: (req, res) => {
    const body = req.body;
    const data = {
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
    };
    User.findByIdAndUpdate(
      req.params.userId,
      data,
      { useFindAndModify: false, new: true },
      (err, user) => {
        console.log(user);
        if (err) return res.status(422).json(responseFormat.format(err, false));

        return res.status(200).json(responseFormat.format(user, true));
      }
    );
  },
  getUser: (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) return res.status(500).json(responseFormat.format(err, false));

      return res.status(200).json(responseFormat.format(user, true));
    });
  },
  getAllUser: (req, res) => {
    User.find({}, "-_id -__v", (err, user) => {
      if (err) return res.status(500).json(responseFormat.format(err, false));

      return res.status(200).json(responseFormat.format(user, true));
    });
  },
};

module.exports = UserController;
