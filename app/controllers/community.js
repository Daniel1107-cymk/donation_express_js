const Community = require("../models/community");
const User = require("../models/user");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const CommunityController = {
  create: asyncWrap(async (req, res) => {
    const body = req.body;
    const file = req.file;
    const user = User.findOne({ email: req.user.email });
    const community = await Community.create({
      user_id: user.__id,
      name: body.name,
      about: body.about,
      email: body.email,
      contact_number: body.contact_number,
      address: body.address,
      banner: file.buffer.toString("base64"),
      mimetype: file.mimetype,
    });
    if (community) {
      return res.status(200).json(responseFormat.format(community, true));
    }
  }),
  getAllCommunity: asyncWrap(async (req, res) => {
    const community = await Community.find({}, "-_id, -__v");
    if (community) {
      return res.status(200).json(responseFormat.format(community, true));
    }
  }),
  update: asyncWrap(async (req, res) => {
    const body = req.body;
    const file = req.file;
    const community = await Community.findById(req.params.communityId);
    if (community) {
      const user = User.findOne({ email: req.user.email });
      const updatedCommuntiy = await Community.findByIdAndUpdate(
        req.params.communityId,
        {
          user_id: user.__id,
          name: body.name,
          about: body.about,
          email: body.email,
          contact_number: body.contact_number,
          address: body.address,
          banner: file.buffer.toString("base64"),
          type: file.mimetype,
        },
        { useFindAndModify: false, new: true }
      );
      msg = {
        msg: "Community successfully updated",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No community found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  delete: asyncWrap(async (req, res) => {
    const community = await Community.findById(req.params.communityId);
    if (community) {
      community.delete();
      msg = {
        msg: "Successfully delete",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No community found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  getCommunity: asyncWrap(async (req, res) => {
    const community = await Community.findById(req.params.communityId);
    if (community) {
      return res.status(200).json(responseFormat.format(community, true));
    } else {
      const msg = [
        {
          msg: "Community not found",
        },
      ];
      return res.status(400).json(responseFormat.format(msg, false));
    }
  }),
};

module.exports = CommunityController;
