const Address = require("../models/address");
const User = require("../models/user");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const AddressController = {
  create: asyncWrap(async (req, res) => {
    const body = req.body;
    const currentUserEmail = req.user.email;
    let msg;

    const user = await User.findOne({ email: currentUserEmail });
    if (user) {
      const address = await Address.create({
        user_id: user._id,
        address: body.address,
        city: body.city,
        zipcode: body.zipcode,
        longitude: body.longitude,
        latitude: body.latidude,
      });
      if (address) {
        user.addresses.push(address);
        await user.save();
        msg = {
          msg: "Successfully added",
        };
        return res.status(200).json(responseFormat.format([msg], true));
      }
    } else {
      msg = {
        msg: "Unauthorize",
      };
      return res.status(401).json(responseFormat.format([msg], true));
    }
  }),
  update: asyncWrap(async (req, res) => {
    const body = req.body;
    const address = await Address.findById(req.params.addressId);
    if (address) {
      const updatedAddress = await Address.findByIdAndUpdate(
        req.params.addressId,
        body,
        { useFindAndModify: false, new: true }
      );
      msg = {
        msg: "Address successfully updated",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No address found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  delete: asyncWrap(async (req, res) => {
    const address = await Address.findById(req.params.addressId);
    if (address) {
      address.delete();
      msg = {
        msg: "Successfully delete",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No address found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  getAllAddress: asyncWrap(async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).populate(
      "addresses"
    );
    if (user) {
      return res.status(200).json(responseFormat.format(user.addresses, true));
    }
    let msg = {
      msg: "Something wrong, please try again",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
};

module.exports = AddressController;
