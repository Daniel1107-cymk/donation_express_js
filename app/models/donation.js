const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    total_quantity: { type: Number, default: 0, required: true },
    total_weight: { type: Number, default: 0 },
    pickup_date: { type: Date, require: true },
    donation_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation_details",
        require: true,
      },
    ],
    donation_images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation_images",
        require: true,
      },
    ],
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "communities",
      require: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("donations", donationSchema);
