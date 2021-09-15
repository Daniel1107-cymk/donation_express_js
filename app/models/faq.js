const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("faqs", faqSchema);
