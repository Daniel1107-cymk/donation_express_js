const mongoose = require("mongoose");

const donationImageSchema = mongoose.Schema(
  {
    donation: { type: mongoose.Schema.Types.ObjectId, ref: "donations" },
    fileName: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("donation_images", donationImageSchema);
