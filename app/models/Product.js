const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    type: { type: String, required: true},
    image: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);
module.exports = mongoose.model("Product", schema);
