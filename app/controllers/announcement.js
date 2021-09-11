const Announcement = require("../models/announcement");
// helper
const responseFormat = require("../helpers/response.format");

const announcementController = {
  create: async (req, res) => {
    try {
      const body = req.body;
      const announcement = await Announcement.create({
        title: body.title,
        description: body.description,
        image: body.image,
      });
      return res.status(200).json(responseFormat.format(announcement, false));
    } catch (err) {
      return res
        .status(500)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  updateAnnouncement: async (req, res) => {
    User.findByIdAndUpdate(req.params.announcementId, req.body, { new: true })
      .then((updatedAnnouncement) => {
        return res
          .status(200)
          .json(responseFormat.format(updatedAnnouncement, true));
      })
      .catch((err) => {
        return res.status(500).json(responseFormat.format(err, false));
      });
  },
  getAnnouncement: async (req, res) => {
    Announcement.find(
      { is_active: true },
      "-_id, -__v",
      (err, announcement) => {
        if (err) return res.status(500).json(responseFormat.format(err, false));

        return res.status(200).json(responseFormat.format(announcement, true));
      }
    );
  },
  deleteAnnouncement: async (req, res) => {
    Announcement.findByIdAndDelete(
      req.params.announcementId,
      (err, announcement) => {
        if (err) return res.status(500).json(responseFormat.format(err, false));

        return res.status(200).json(responseFormat.format(announcement, true));
      }
    );
  },
};

module.exports = announcementController;
