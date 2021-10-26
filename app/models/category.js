const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    priority: { type: String, required: true },
    description: { type: String },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("categories", categorySchema);
