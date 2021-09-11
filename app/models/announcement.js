const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    is_active: { type: Boolean, default: 1 },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("announcements", announcementSchema);
