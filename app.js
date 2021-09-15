const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const upload = multer();
const connection = require("./app/models/db");
// env
require("dotenv").config();
const PORT = process.env.PORT || 3000;
// middleware
app.use(express.json());
app.use(morgan("tiny"));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
connection;

require("./app/routes/user")(app);
require("./app/routes/announcement")(app);
require("./app/routes/donation")(app);
require("./app/routes/faq")(app);

app.listen(PORT, () => {});
