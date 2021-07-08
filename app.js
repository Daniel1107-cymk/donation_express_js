const express = require("express");
const app = express();
const morgan = require("morgan");
const connection = require("./app/models/db");
// middleware
app.use(express.json());
app.use(morgan("tiny"));

// connect to mongodb
connection;

require("./app/routes/user.routes")(app);

app.listen("3000", () => {});
