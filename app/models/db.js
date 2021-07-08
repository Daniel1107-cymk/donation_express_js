const mongoose = require("mongoose");
// env
require("dotenv").config();
// dbconnect
const dbConnect = process.env.DB_CONNECT;

// connect to mongodb
const connection = mongoose
  .connect(dbConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("success connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
