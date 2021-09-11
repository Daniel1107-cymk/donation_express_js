const express = require("express");
const app = express();
const morgan = require("morgan");
const connection = require("./app/models/db");
// env
require("dotenv").config();
const PORT = process.env.PORT || 3000;
// middleware
app.use(express.json());
app.use(morgan("tiny"));

// connect to mongodb
connection;

require("./app/routes/user")(app);
require("./app/routes/announcement")(app);

app.listen(PORT, () => {});
