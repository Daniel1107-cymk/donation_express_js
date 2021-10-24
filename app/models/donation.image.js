const mongoose = require("mongoose");

const donationImageSchema = mongoose.Schema(
  {
    donation: { type: mongoose.Schema.Types.ObjectId, ref: "donations" },
    image: { type: String, require: true },
    mimetype: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("donation_images", donationImageSchema);
