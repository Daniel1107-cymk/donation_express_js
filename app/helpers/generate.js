require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.randomPassword = async (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.token = async ({ userId, email }) => {
  const token = jwt.sign({ user_id: userId, email }, process.env.TOKEN_SECRET, {
    expiresIn: "1 day",
  });
  return token;
};
