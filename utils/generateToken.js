const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretkey = process.env.SE;

const generateToken = (email) => {
  return jwt.sign({ data: email, succes: true }, secretkey, {
    expiresIn: "1d",
  });
};
module.exports = generateToken;