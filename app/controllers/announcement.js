const Announcement = require("../models/announcement");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const announcementController = {
  create: asyncWrap(async (req, res) => {
    const body = req.body;
    const announcement = await Announcement.create({
      title: body.title,
      description: body.description,
      image: body.image,
    });
    if (announcement) {
      return res.status(200).json(responseFormat.format(announcement, false));
    }
    let msg = {
      msg: "Successfully delete",
    };
    return res.status(500).json(responseFormat.format([msg], false));
  }),
  updateAnnouncement: asyncWrap(async (req, res) => {
    const announcement = await Announcement.findById(req.params.announcementId);
    let msg;
    if (announcement) {
      const updatedAnnouncement = Announcement.findByIdAndUpdate(
        req.params.announcementId,
        req.body,
        { new: true }
      );
      if (updatedAnnouncement) {
        return res
          .status(200)
          .json(responseFormat.format(updatedAnnouncement, true));
      }
      msg = {
        msg: "Failed to update announcement",
      };
      return res.status(400).json(responseFormat.format([msg], false));
    }
    msg = {
      msg: "No announcement found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  getAnnouncement: asyncWrap(async (req, res) => {
    const announcement = await Announcement.find(
      { is_active: true },
      "-_id -__v"
    );
    return res.status(200).json(responseFormat.format(announcement, true));
  }),
  deleteAnnouncement: asyncWrap(async (req, res) => {
    const announcement = await Announcement.findOne({
      _id: req.params.announcementId,
    });
    let msg;
    if (announcement) {
      announcement.delete();
      msg = {
        msg: "Successfully delete",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No announcement found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
};

module.exports = announcementController;
