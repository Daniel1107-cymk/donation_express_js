// env
require("dotenv").config();
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Announcement = require("../controllers/announcement");

module.exports = (app) => {
  // create
  app.post(`${apiPrefix}/announcement`, auth, Announcement.create);
  // update
  app.put(
    `${apiPrefix}/update-announcement/:announcementId`,
    auth,
    Announcement.updateAnnouncement
  );
  // get all
  app.post(`${apiPrefix}/announcement`, auth, Announcement.getAnnouncement);
  // delete
  app.delete(
    `${apiPrefix}/update-announcement/:announcementId`,
    auth,
    Announcement.deleteAnnouncement
  );
};
