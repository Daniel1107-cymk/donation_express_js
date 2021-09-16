const Address = require("../models/address");
const User = require("../models/user");
// helper
const responseFormat = require("../helpers/response.format");

const AddressController = {
  create: (req, res) => {
    const body = req.body;
    const currentUserEmail = req.user.email;

    User.findOne({ email: currentUserEmail }).exec((err, user) => {
      if (err)
        return res
          .status(404)
          .json(responseFormat.format(err?.errors ?? err, false));

      const address = Address({
        user_id: user._id,
        address: body.address,
        city: body.city,
        zipcode: body.zipcode,
        longitude: body.longitude,
        latitude: body.latidude,
      });

      address.save((err, address) => {
        if (err)
          return res
            .status(422)
            .json(responseFormat.format(err?.errors ?? err, false));

        user.addresses.push(address);
        user.save((err) => {
          if (err)
            return res
              .status(422)
              .json(responseFormat.format(err?.errors ?? err, false));
        });
        return res.status(200).json(responseFormat.format(address, true));
      });
    });
  },
  update: (req, res) => {
    Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      {
        new: true,
      },
      (err, address) => {
        if (err)
          return res
            .status(422)
            .json(responseFormat.format(err?.errors ?? err, false));
        return res.status(200).json(responseFormat.format(address, true));
      }
    );
  },
  delete: (req, res) => {
    Address.deleteOne({ _id: req.params.addressId }, (err) => {
      if (err)
        return res
          .status(422)
          .json(responseFormat.format(err?.errors ?? err, false));

      const msg = [
        {
          msg: "Address successfully deleted",
        },
      ];
      return res.status(200).json(responseFormat.format(msg, true));
    });
  },
  getAllAddress: (req, res) => {
    User.findOne({ email: req.user.email })
      .populate("addresses")
      .exec((err, user) => {
        if (err)
          return res
            .status(400)
            .json(responseFormat.format(err?.errors ?? err, false));

        return res
          .status(200)
          .json(responseFormat.format(user.addresses, true));
      });
  },
};

module.exports = AddressController;
