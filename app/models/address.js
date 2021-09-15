const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    longitude: { type: Number },
    latitude: { type: Number },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("addresses", addressSchema);
