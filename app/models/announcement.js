const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("announcements", announcementSchema);
