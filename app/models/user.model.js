const mongoose = require("mongoose");
const responseFormat = require("../helpers/response.format");
const byscrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String },
  full_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: { type: String, default: 0 },
  google_id: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("users", userSchema);
