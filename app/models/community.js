const mongoose = require("mongoose");

const communitySchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    name: { type: String, required: true },
    about: { type: String, required: true },
    email: { type: String, required: true },
    contact_number: { type: String, required: true },
    address: { type: String, required: true },
    banner: { type: String },
    mimetype: { type: String },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("communities", communitySchema);
