const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, default: "" },
    phone_number: { type: String, required: true },
    role: { type: String, default: 0 },
    google_id: { type: String, default: null },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "addresses" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("users", userSchema);
