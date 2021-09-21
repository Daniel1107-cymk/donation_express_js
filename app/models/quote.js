const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("quotes", quoteSchema);
