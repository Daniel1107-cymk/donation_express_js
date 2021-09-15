const Address = require("../models/donation");
const User = require("../models/user");
// helper
const responseFormat = require("../helpers/response.format");

const AddressController = {
  create: async (req, res) => {
    const body = req.body;
    const currentUserEmail = req.user.email;
    const user = await User.findOne({ email: currentUserEmail });

    try {
      const address = await Address.create({
        user_id: user._id,
        address: body.address,
        city: body.city,
        zipcode: body.zipcode,
        longitude: body.longitude,
        latitude: body.latidude,
      });

      user.addresses.push(address);
      user.save();

      return res.status(200).json(responseFormat.format(address, true));
    } catch (err) {
      return res
        .status(500)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  update: async (req, res) => {
    try {
      const address = await Address.findByIdAndUpdate(
        req.params.addressId,
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(responseFormat.format(address, true));
    } catch (err) {
      return res
        .status(422)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  delete: async (req, res) => {
    try {
      const address = await Address.deleteOne({ _id: req.params.addressId });
      const msg = [
        {
          msg: "Successfully delete",
        },
      ];
      return res.status(200).json(responseFormat.format(msg, true));
    } catch (err) {
      return res
        .status(400)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  getAllAddress: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      const allUserAddress = await Address.find(
        { user_id: user._id },
        "-_id, -__v"
      );

      return res.status(200).json(responseFormat.format(allUserAddress, true));
    } catch (err) {
      return res
        .status(400)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
};

module.exports = AddressController;
