const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    recipient_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    total_quantity: { type: Number, default: 0, required: true },
    total_weight: { type: Number, default: 0 },
    pickup_date: { type: Date, required: true },
    status: { type: String, default: "Pending" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
    donation_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation_details",
        required: true,
      },
    ],
    donation_images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation_images",
        required: true,
      },
    ],
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "communities",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("donations", donationSchema);
