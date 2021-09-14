const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    full_address: { type: String, required: true },
    phone_number: { type: String, required: true },
    role: { type: String, default: 0 },
    google_id: { type: String },
    token: { type: String },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("users", userSchema);
