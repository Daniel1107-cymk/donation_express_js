const mongoose = require("mongoose");

const donationDetailSchema = mongoose.Schema(
  {
    donation: { type: mongoose.Schema.Types.ObjectId, ref: "donations" },
    product_name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    weight: { type: Number },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("donation_details", donationDetailSchema);
